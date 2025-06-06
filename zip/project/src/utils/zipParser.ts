import JSZip from 'jszip';
import { FileNode, ZipAnalysis } from '../types';

export class ZipParser {
  private zip: JSZip | null = null;

  async parseZipFile(file: File): Promise<{ files: FileNode[], analysis: ZipAnalysis }> {
    try {
      this.zip = await JSZip.loadAsync(file);
      
      const files = this.buildFileTree();
      const analysis = this.analyzeZip();
      
      return { files, analysis };
    } catch (error) {
      console.error('Error parsing ZIP file:', error);
      throw new Error('Failed to parse ZIP file. Please ensure it\'s a valid ZIP archive.');
    }
  }

  private buildFileTree(): FileNode[] {
    if (!this.zip) return [];

    const fileMap = new Map<string, FileNode>();
    const rootFiles: FileNode[] = [];

    // First pass: create all file/folder nodes
    this.zip.forEach((relativePath, zipEntry) => {
      const parts = relativePath.split('/').filter(part => part.length > 0);
      const isDirectory = zipEntry.dir;
      
      // Create the current file/folder node
      const currentPath = relativePath.endsWith('/') ? relativePath.slice(0, -1) : relativePath;
      const name = parts[parts.length - 1] || '';
      
      if (!fileMap.has(currentPath) && name) {
        const extension = isDirectory ? undefined : this.getFileExtension(name);
        const node: FileNode = {
          name,
          path: currentPath,
          type: isDirectory ? 'folder' : 'file',
          size: isDirectory ? undefined : zipEntry._data?.uncompressedSize || 0,
          extension,
          children: isDirectory ? [] : undefined,
          isRisky: this.isRiskyFile(name, extension),
          compressedSize: isDirectory ? undefined : zipEntry._data?.compressedSize || 0,
          lastModified: zipEntry.date || new Date()
        };
        
        fileMap.set(currentPath, node);
      }

      // Create parent directories if they don't exist
      for (let i = 0; i < parts.length - 1; i++) {
        const parentPath = parts.slice(0, i + 1).join('/');
        if (!fileMap.has(parentPath)) {
          const parentNode: FileNode = {
            name: parts[i],
            path: parentPath,
            type: 'folder',
            children: []
          };
          fileMap.set(parentPath, parentNode);
        }
      }
    });

    // Second pass: build the tree structure
    fileMap.forEach((node, path) => {
      const parts = path.split('/');
      if (parts.length === 1) {
        // Root level file/folder
        rootFiles.push(node);
      } else {
        // Find parent and add as child
        const parentPath = parts.slice(0, -1).join('/');
        const parent = fileMap.get(parentPath);
        if (parent && parent.children) {
          parent.children.push(node);
        }
      }
    });

    // Sort files and folders
    this.sortFileTree(rootFiles);
    
    return rootFiles;
  }

  private sortFileTree(nodes: FileNode[]): void {
    nodes.sort((a, b) => {
      // Folders first, then files
      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1;
      }
      // Then alphabetically
      return a.name.localeCompare(b.name);
    });

    // Recursively sort children
    nodes.forEach(node => {
      if (node.children) {
        this.sortFileTree(node.children);
      }
    });
  }

  private analyzeZip(): ZipAnalysis {
    if (!this.zip) {
      throw new Error('ZIP not loaded');
    }

    let totalFiles = 0;
    let totalFolders = 0;
    let totalSize = 0;
    let compressedSize = 0;
    const fileTypes: { [key: string]: number } = {};
    const riskyFiles: FileNode[] = [];
    const largestFiles: FileNode[] = [];

    this.zip.forEach((relativePath, zipEntry) => {
      if (zipEntry.dir) {
        totalFolders++;
      } else {
        totalFiles++;
        const size = zipEntry._data?.uncompressedSize || 0;
        const compressed = zipEntry._data?.compressedSize || 0;
        
        totalSize += size;
        compressedSize += compressed;

        // Track file types
        const extension = this.getFileExtension(zipEntry.name);
        if (extension) {
          fileTypes[extension] = (fileTypes[extension] || 0) + 1;
        }

        // Check for risky files
        if (this.isRiskyFile(zipEntry.name, extension)) {
          riskyFiles.push({
            name: zipEntry.name.split('/').pop() || zipEntry.name,
            path: relativePath,
            type: 'file',
            size,
            extension,
            isRisky: true,
            compressedSize: compressed,
            lastModified: zipEntry.date || new Date()
          });
        }

        // Track largest files
        largestFiles.push({
          name: zipEntry.name.split('/').pop() || zipEntry.name,
          path: relativePath,
          type: 'file',
          size,
          extension,
          compressedSize: compressed,
          lastModified: zipEntry.date || new Date()
        });
      }
    });

    // Sort largest files and take top 10
    largestFiles.sort((a, b) => (b.size || 0) - (a.size || 0));
    const topLargestFiles = largestFiles.slice(0, 10);

    const compressionRatio = totalSize > 0 ? Math.round(((totalSize - compressedSize) / totalSize) * 100) : 0;

    return {
      totalFiles,
      totalFolders,
      totalSize,
      compressedSize,
      compressionRatio,
      fileTypes,
      riskyFiles,
      largestFiles: topLargestFiles
    };
  }

  private getFileExtension(filename: string): string | undefined {
    const lastDot = filename.lastIndexOf('.');
    if (lastDot === -1 || lastDot === filename.length - 1) {
      return undefined;
    }
    return filename.substring(lastDot + 1).toLowerCase();
  }

  private isRiskyFile(filename: string, extension?: string): boolean {
    const riskyExtensions = [
      'exe', 'bat', 'cmd', 'com', 'scr', 'pif', 'vbs', 'js', 'jar',
      'msi', 'dll', 'sys', 'drv', 'ocx', 'cpl', 'inf', 'reg'
    ];

    // Check extension
    if (extension && riskyExtensions.includes(extension)) {
      return true;
    }

    // Check for double extensions (like file.pdf.exe)
    const parts = filename.split('.');
    if (parts.length > 2) {
      const secondToLastExt = parts[parts.length - 2].toLowerCase();
      if (['pdf', 'doc', 'docx', 'txt', 'jpg', 'png'].includes(secondToLastExt)) {
        return true;
      }
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /^\./, // Hidden files starting with dot
      /\$/, // Files ending with $
      /autorun/i,
      /setup/i,
      /install/i,
      /update/i,
      /patch/i
    ];

    return suspiciousPatterns.some(pattern => pattern.test(filename));
  }

  async getFileContent(filePath: string): Promise<string | ArrayBuffer | null> {
    if (!this.zip) return null;

    const file = this.zip.file(filePath);
    if (!file) return null;

    try {
      // For text files, return as string
      const extension = this.getFileExtension(filePath);
      const textExtensions = ['txt', 'json', 'js', 'ts', 'html', 'css', 'md', 'xml', 'csv'];
      
      if (extension && textExtensions.includes(extension)) {
        return await file.async('string');
      } else {
        // For binary files, return as ArrayBuffer
        return await file.async('arraybuffer');
      }
    } catch (error) {
      console.error('Error reading file content:', error);
      return null;
    }
  }
}