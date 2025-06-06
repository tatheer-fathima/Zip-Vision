import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Archive, HardDrive, Zap, FileText, TrendingUp, TrendingDown } from 'lucide-react';
import { ZipAnalysis } from '../types';

interface AnalyticsDashboardProps {
  analysis: ZipAnalysis;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ analysis }) => {
  const fileTypeData = Object.entries(analysis.fileTypes).map(([type, count]) => ({
    name: type.toUpperCase(),
    value: count,
    color: getColorForFileType(type),
  }));

  const compressionData = [
    { name: 'Original Size', value: analysis.totalSize, color: '#3b82f6' },
    { name: 'Compressed Size', value: analysis.compressedSize, color: '#10b981' },
  ];

  const stats = [
    {
      title: 'Total Files',
      value: analysis.totalFiles,
      icon: <FileText className="h-6 w-6" />,
      color: 'text-primary-600',
      bg: 'bg-primary-100 dark:bg-primary-900/20',
    },
    {
      title: 'Total Folders',
      value: analysis.totalFolders,
      icon: <Archive className="h-6 w-6" />,
      color: 'text-secondary-600',
      bg: 'bg-secondary-100 dark:bg-secondary-900/20',
    },
    {
      title: 'Original Size',
      value: formatFileSize(analysis.totalSize),
      icon: <HardDrive className="h-6 w-6" />,
      color: 'text-accent-600',
      bg: 'bg-accent-100 dark:bg-accent-900/20',
    },
    {
      title: 'Compression Ratio',
      value: `${analysis.compressionRatio}%`,
      icon: analysis.compressionRatio > 0 ? <TrendingDown className="h-6 w-6" /> : <TrendingUp className="h-6 w-6" />,
      color: analysis.compressionRatio > 0 ? 'text-success-600' : 'text-warning-600',
      bg: analysis.compressionRatio > 0 ? 'bg-success-100 dark:bg-success-900/20' : 'bg-warning-100 dark:bg-warning-900/20',
    },
  ];

  function getColorForFileType(type: string): string {
    const colors: { [key: string]: string } = {
      txt: '#3b82f6',
      json: '#10b981',
      js: '#f59e0b',
      html: '#ef4444',
      css: '#8b5cf6',
      png: '#06b6d4',
      jpg: '#f97316',
      pdf: '#dc2626',
      zip: '#6366f1',
      exe: '#991b1b',
    };
    return colors[type] || '#6b7280';
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Types Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">File Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fileTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {fileTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Size Comparison */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Size Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={compressionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => formatFileSize(value)} />
              <Tooltip formatter={(value) => formatFileSize(value as number)} />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Largest Files */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Largest Files</h3>
        <div className="space-y-3">
          {analysis.largestFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{file.path}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formatFileSize(file.size || 0)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {((file.size || 0) / analysis.totalSize * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};