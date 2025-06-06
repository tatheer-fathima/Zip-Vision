import React from 'react';
import { AlertTriangle, Shield, AlertCircle, CheckCircle, FileText, X } from 'lucide-react';
import { FileNode } from '../types';

interface SecurityScanProps {
  riskyFiles: FileNode[];
}

export const SecurityScan: React.FC<SecurityScanProps> = ({ riskyFiles }) => {
  const getRiskLevel = (file: FileNode): 'high' | 'medium' | 'low' => {
    const extension = file.extension?.toLowerCase();
    if (['exe', 'bat', 'cmd', 'scr', 'com', 'pif'].includes(extension || '')) {
      return 'high';
    }
    if (['js', 'vbs', 'ps1', 'jar'].includes(extension || '')) {
      return 'medium';
    }
    return 'low';
  };

  const getRiskDescription = (file: FileNode): string => {
    const extension = file.extension?.toLowerCase();
    const riskLevel = getRiskLevel(file);
    
    if (riskLevel === 'high') {
      return `Executable file (.${extension}) - Can run programs on your computer`;
    }
    if (riskLevel === 'medium') {
      return `Script file (.${extension}) - Can execute commands when opened`;
    }
    return 'Potentially suspicious file pattern detected';
  };

  const getRiskColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
    }
  };

  const totalScanned = 15; // Mock total files scanned
  const securityScore = Math.max(0, 100 - (riskyFiles.length * 20));

  return (
    <div className="space-y-6">
      {/* Security Score */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security Analysis</h2>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
            securityScore >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
            securityScore >= 60 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
            'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {securityScore >= 80 ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
            <span className="font-semibold">{securityScore}/100</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalScanned}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Files Scanned</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{riskyFiles.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Risky Files</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{totalScanned - riskyFiles.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Safe Files</div>
          </div>
        </div>

        {/* Security Score Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              securityScore >= 80 ? 'bg-green-500' :
              securityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${securityScore}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
          {securityScore >= 80 ? 'Archive appears safe' :
           securityScore >= 60 ? 'Some security concerns found' :
           'Multiple security risks detected'}
        </p>
      </div>

      {/* Risk Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
              <X className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">High Risk</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {riskyFiles.filter(f => getRiskLevel(f) === 'high').length} files
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-2 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Medium Risk</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {riskyFiles.filter(f => getRiskLevel(f) === 'medium').length} files
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Safe Files</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {totalScanned - riskyFiles.length} files
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Risky Files List */}
      {riskyFiles.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detailed Risk Analysis</h3>
          <div className="space-y-3">
            {riskyFiles.map((file, index) => {
              const riskLevel = getRiskLevel(file);
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    riskLevel === 'high' ? 'border-red-400 bg-red-50 dark:bg-red-900/10' :
                    riskLevel === 'medium' ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10' :
                    'border-blue-400 bg-blue-50 dark:bg-blue-900/10'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <FileText className={`h-5 w-5 mt-0.5 ${
                        riskLevel === 'high' ? 'text-red-600' :
                        riskLevel === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                      }`} />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{file.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{file.path}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {getRiskDescription(file)}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(riskLevel)}`}>
                      {riskLevel.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Security Recommendations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <p className="text-gray-700 dark:text-gray-300">
              Scan all executable files with antivirus software before running
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <p className="text-gray-700 dark:text-gray-300">
              Be cautious with script files that can execute commands
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <p className="text-gray-700 dark:text-gray-300">
              Extract files to a sandboxed environment if possible
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <p className="text-gray-700 dark:text-gray-300">
              Verify the source of the ZIP file before trusting its contents
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};