import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { FileExplorer } from './FileExplorer';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { SecurityScan } from './SecurityScan';
import { FilePreview } from './FilePreview';
import { FileNode, ZipAnalysis, PreviewData } from '../types';
import { ZipParser } from '../utils/zipParser';

export const Dashboard: React.FC = () => {
  const [zipData, setZipData] = useState<FileNode[] | null>(null);
  const [analysis, setAnalysis] = useState<ZipAnalysis | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [activeTab, setActiveTab] = useState<'explorer' | 'analytics' | 'security'>('explorer');
  const [zipParser, setZipParser] = useState<ZipParser | null>(null);

  const handleFileUpload = (files: FileNode[], analysisData: ZipAnalysis) => {
    setZipData(files);
    setAnalysis(analysisData);
    setActiveTab('explorer');
  };

  const handleFileSelect = async (file: FileNode) => {
    setSelectedFile(file);
    setPreviewData(null);
    
    if (file.type === 'file' && zipParser) {
      try {
        const content = await zipParser.getFileContent(file.path);
        if (content) {
          const extension = file.extension?.toLowerCase();
          let preview: PreviewData;
          
          if (extension === 'txt' || extension === 'md' || extension === 'csv') {
            preview = {
              type: 'text',
              content: content as string
            };
          } else if (extension === 'json') {
            try {
              const jsonContent = JSON.parse(content as string);
              preview = {
                type: 'json',
                content: JSON.stringify(jsonContent, null, 2)
              };
            } catch {
              preview = {
                type: 'text',
                content: content as string
              };
            }
          } else if (['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'html', 'css', 'xml'].includes(extension || '')) {
            preview = {
              type: 'code',
              language: extension === 'py' ? 'python' : 
                       extension === 'java' ? 'java' : 
                       extension === 'cpp' || extension === 'c' ? 'cpp' :
                       extension === 'html' ? 'html' :
                       extension === 'css' ? 'css' :
                       extension === 'xml' ? 'xml' :
                       'javascript',
              content: content as string
            };
          } else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(extension || '')) {
            // Convert ArrayBuffer to base64 for image display
            const arrayBuffer = content as ArrayBuffer;
            const uint8Array = new Uint8Array(arrayBuffer);
            const base64String = btoa(String.fromCharCode(...uint8Array));
            const mimeType = `image/${extension === 'jpg' ? 'jpeg' : extension}`;
            
            preview = {
              type: 'image',
              content: `data:${mimeType};base64,${base64String}`
            };
          } else {
            preview = {
              type: 'unsupported',
              error: `Preview not available for .${extension} files`
            };
          }
          
          setPreviewData(preview);
        }
      } catch (error) {
        console.error('Error loading file content:', error);
        setPreviewData({
          type: 'unsupported',
          error: 'Failed to load file content'
        });
      }
    }
  };

  const tabs = [
    { id: 'explorer', label: 'File Explorer', count: zipData?.length || 0 },
    { id: 'analytics', label: 'Analytics', count: analysis?.totalFiles || 0 },
    { id: 'security', label: 'Security', count: analysis?.riskyFiles.length || 0 },
  ];

  if (!zipData) {
    return <FileUpload onUpload={(files, analysis) => {
      handleFileUpload(files, analysis);
      // Store the zip parser instance for file content loading
      setZipParser(new ZipParser());
    }} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ZIP Explorer Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Analyze and explore your ZIP archive with advanced tools
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 py-0.5 px-2.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {activeTab === 'explorer' && (
              <FileExplorer files={zipData} onFileSelect={handleFileSelect} />
            )}
            {activeTab === 'analytics' && analysis && (
              <AnalyticsDashboard analysis={analysis} />
            )}
            {activeTab === 'security' && analysis && (
              <SecurityScan riskyFiles={analysis.riskyFiles} />
            )}
          </div>

          <div className="lg:col-span-1">
            <FilePreview file={selectedFile} previewData={previewData} />
          </div>
        </div>
      </div>
    </div>
  );
};