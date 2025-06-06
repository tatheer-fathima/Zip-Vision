import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, Search, Filter, AlertTriangle } from 'lucide-react';
import { FileNode } from '../types';

interface FileExplorerProps {
  files: FileNode[];
  onFileSelect: (file: FileNode) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ files, onFileSelect }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const getAllFiles = (nodes: FileNode[]): FileNode[] => {
    const result: FileNode[] = [];
    const traverse = (items: FileNode[]) => {
      items.forEach(item => {
        result.push(item);
        if (item.children) {
          traverse(item.children);
        }
      });
    };
    traverse(nodes);
    return result;
  };

  const filteredFiles = getAllFiles(files).filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'risky' && file.isRisky) ||
                         (filterType === 'images' && ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(file.extension || '')) ||
                         (filterType === 'documents' && ['txt', 'pdf', 'doc', 'docx'].includes(file.extension || '')) ||
                         (filterType === 'code' && ['js', 'ts', 'py', 'java', 'cpp', 'html', 'css'].includes(file.extension || ''));
    
    return matchesSearch && matchesFilter;
  });

  const renderFileNode = (node: FileNode, level: number = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const paddingLeft = level * 20;

    return (
      <div key={node.path} className="select-none">
        <div
          className={`flex items-center py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors ${
            node.isRisky ? 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400' : ''
          }`}
          style={{ paddingLeft: paddingLeft + 12 }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path);
            } else {
              onFileSelect(node);
            }
          }}
        >
          {node.type === 'folder' ? (
            <>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-400 mr-2" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
              )}
              <Folder className="h-4 w-4 text-primary-500 mr-2" />
            </>
          ) : (
            <>
              <div className="w-4 mr-2" />
              <File className="h-4 w-4 text-gray-400 mr-2" />
            </>
          )}
          
          <span className="flex-1 text-sm text-gray-900 dark:text-gray-100">
            {node.name}
          </span>
          
          {node.isRisky && (
            <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
          )}
          
          {node.type === 'file' && node.size && (
            <span className="text-xs text-gray-500 ml-2">
              {formatFileSize(node.size)}
            </span>
          )}
        </div>
        
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderFileNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">File Explorer</h2>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Files</option>
              <option value="risky">Risky Files</option>
              <option value="images">Images</option>
              <option value="documents">Documents</option>
              <option value="code">Code Files</option>
            </select>
          </div>
        </div>
      </div>

      {/* File Tree */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {searchTerm || filterType !== 'all' ? (
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {filteredFiles.length} files found
            </div>
            {filteredFiles.map(file => (
              <div key={file.path} className="mb-1">
                <div
                  className={`flex items-center py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors ${
                    file.isRisky ? 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400' : ''
                  }`}
                  onClick={() => file.type === 'file' && onFileSelect(file)}
                >
                  <File className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="flex-1 text-sm text-gray-900 dark:text-gray-100">
                    {file.path}
                  </span>
                  {file.isRisky && (
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  {file.size && (
                    <span className="text-xs text-gray-500 ml-2">
                      {formatFileSize(file.size)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {files.map(node => renderFileNode(node))}
          </div>
        )}
      </div>
    </div>
  );
};