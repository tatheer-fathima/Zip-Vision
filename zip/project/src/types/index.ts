export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  size?: number;
  children?: FileNode[];
  extension?: string;
  isRisky?: boolean;
  compressedSize?: number;
  lastModified?: Date;
}

export interface ZipAnalysis {
  totalFiles: number;
  totalFolders: number;
  totalSize: number;
  compressedSize: number;
  compressionRatio: number;
  fileTypes: { [key: string]: number };
  riskyFiles: FileNode[];
  largestFiles: FileNode[];
}

export interface PreviewData {
  type: 'text' | 'image' | 'json' | 'code' | 'pdf' | 'unsupported';
  content?: string;
  language?: string;
  error?: string;
}