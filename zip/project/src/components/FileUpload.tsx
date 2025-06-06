import React, { useCallback } from 'react';
import { Upload, FileArchive, Zap, AlertCircle } from 'lucide-react';
import { FileNode, ZipAnalysis } from '../types';
import { ZipParser } from '../utils/zipParser';

interface FileUploadProps {
  onUpload: (files: FileNode[], analysis: ZipAnalysis) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const processZipFile = useCallback(async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const zipParser = new ZipParser();
      const { files, analysis } = await zipParser.parseZipFile(file);
      onUpload(files, analysis);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process ZIP file';
      setError(errorMessage);
      console.error('ZIP processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const zipFile = files.find(file => 
      file.name.toLowerCase().endsWith('.zip') || 
      file.type === 'application/zip' ||
      file.type === 'application/x-zip-compressed'
    );
    
    if (zipFile) {
      processZipFile(zipFile);
    } else {
      setError('Please select a valid ZIP file');
    }
  }, [processZipFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const zipFile = files.find(file => 
      file.name.toLowerCase().endsWith('.zip') || 
      file.type === 'application/zip' ||
      file.type === 'application/x-zip-compressed'
    );
    
    if (zipFile) {
      processZipFile(zipFile);
    } else {
      setError('Please select a valid ZIP file');
    }
  }, [processZipFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-primary-500 to-secondary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileArchive className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Upload Your ZIP File
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Drag & drop your ZIP file or click to browse. We'll analyze it instantly without extraction.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
            isDragOver
              ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20 scale-105'
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
          } ${isProcessing ? 'pointer-events-none' : 'cursor-pointer'}`}
        >
          <input
            type="file"
            accept=".zip,application/zip,application/x-zip-compressed"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isProcessing}
          />

          {isProcessing ? (
            <div className="animate-fade-in">
              <div className="animate-spin w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Processing ZIP File...
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Analyzing structure and scanning for security issues
              </p>
            </div>
          ) : (
            <div>
              <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragOver ? 'text-primary-500' : 'text-gray-400'}`} />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {isDragOver ? 'Drop your ZIP file here' : 'Choose or drag a ZIP file'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Maximum file size: 100MB
              </p>
              <button className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-700 hover:to-secondary-700 transition-all">
                Browse Files
              </button>
            </div>
          )}
        </div>

        {/* Features Preview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Real-time Analysis</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Get actual insights from your ZIP files</p>
          </div>
          
          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileArchive className="h-5 w-5 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">No Extraction</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Explore files without unpacking</p>
          </div>
          
          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <div className="bg-gradient-to-br from-accent-500 to-accent-600 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Upload className="h-5 w-5 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Secure & Private</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Your files stay in your browser</p>
          </div>
        </div>
      </div>
    </div>
  );
};