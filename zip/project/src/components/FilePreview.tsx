import React from 'react';
import { File, Image, Code, FileText, AlertCircle, Eye, Download, ExternalLink } from 'lucide-react';
import { FileNode, PreviewData } from '../types';

interface FilePreviewProps {
  file: FileNode | null;
  previewData: PreviewData | null;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, previewData }) => {
  if (!file) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center">
          <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No File Selected</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Select a file from the explorer to preview its contents
          </p>
        </div>
      </div>
    );
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileIcon = (extension: string) => {
    const ext = extension?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return <Image className="h-5 w-5" />;
    if (['js', 'ts', 'py', 'java', 'cpp', 'html', 'css'].includes(ext)) return <Code className="h-5 w-5" />;
    if (['txt', 'md', 'json'].includes(ext)) return <FileText className="h-5 w-5" />;
    return <File className="h-5 w-5" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-100 dark:bg-primary-900/20 p-2 rounded-lg text-primary-600 dark:text-primary-400">
              {getFileIcon(file.extension || '')}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{file.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{file.path}</p>
            </div>
          </div>
          {file.isRisky && (
            <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
          )}
        </div>

        {/* File Info */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Size:</span>
            <span className="ml-2 text-gray-900 dark:text-white">
              {file.size ? formatFileSize(file.size) : 'Unknown'}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Type:</span>
            <span className="ml-2 text-gray-900 dark:text-white">
              {file.extension?.toUpperCase() || 'Unknown'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button className="flex items-center space-x-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
            <Download className="h-4 w-4" />
            <span>Extract</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
            <ExternalLink className="h-4 w-4" />
            <span>Open</span>
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-6">
        {!previewData ? (
          <div className="text-center py-8">
            <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading preview...</p>
          </div>
        ) : previewData.type === 'unsupported' ? (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">{previewData.error}</p>
          </div>
        ) : previewData.type === 'text' || previewData.type === 'json' ? (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-96 overflow-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {previewData.content}
            </pre>
          </div>
        ) : previewData.type === 'code' ? (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-96 overflow-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {previewData.language?.toUpperCase()}
              </span>
            </div>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              <code>{previewData.content}</code>
            </pre>
          </div>
        ) : previewData.type === 'image' ? (
          <div className="text-center">
            <img
              src={previewData.content}
              alt={file.name}
              className="max-w-full max-h-96 rounded-lg shadow-md mx-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Sample image preview (actual image would be extracted from ZIP)
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Preview not available for this file type</p>
          </div>
        )}
      </div>
    </div>
  );
};