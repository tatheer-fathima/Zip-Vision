import React from 'react';
import { Archive, Eye, Shield, BarChart3, Search, Zap, FileText, Image, Code, Download, GitCompare as Compare, Lock, Cpu, Cloud, Smartphone, Globe } from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const coreFeatures = [
    {
      icon: <Archive className="h-8 w-8" />,
      title: 'Smart ZIP Explorer',
      description: 'Navigate through ZIP archives without extraction. Interactive file tree with instant folder expansion and file browsing.',
      benefits: ['No extraction required', 'Instant navigation', 'Memory efficient', 'Preserves file structure'],
      color: 'from-primary-500 to-primary-600',
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: 'Live File Preview',
      description: 'Preview text, images, JSON, and code files directly in your browser with syntax highlighting and formatting.',
      benefits: ['Multiple file types', 'Syntax highlighting', 'Image thumbnails', 'JSON formatting'],
      color: 'from-secondary-500 to-secondary-600',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Security Scanner',
      description: 'Advanced threat detection that identifies potentially dangerous files, executables, and suspicious patterns.',
      benefits: ['Malware detection', 'Risk assessment', 'Pattern analysis', 'Safety recommendations'],
      color: 'from-accent-500 to-accent-600',
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Advanced Analytics',
      description: 'Comprehensive file analysis with interactive charts, compression ratios, and detailed statistics.',
      benefits: ['Visual charts', 'Size analysis', 'Type distribution', 'Compression metrics'],
      color: 'from-success-500 to-success-600',
    },
  ];

  const advancedFeatures = [
    {
      icon: <Search className="h-8 w-8 text-primary-500" />,
      title: 'Smart Search & Filter',
      description: 'Find files instantly with powerful search and filtering capabilities.',
    },
    {
      icon: <Compare className="h-8 w-8 text-secondary-500" />,
      title: 'Archive Comparison',
      description: 'Compare two ZIP files side-by-side to identify differences.',
    },
    {
      icon: <Download className="h-8 w-8 text-accent-500" />,
      title: 'Selective Extraction',
      description: 'Extract only the files you need without unpacking everything.',
    },
    {
      icon: <Lock className="h-8 w-8 text-warning-500" />,
      title: 'Password Protection',
      description: 'Handle password-protected archives with secure input methods.',
    },
    {
      icon: <Cpu className="h-8 w-8 text-error-500" />,
      title: 'ML File Detection',
      description: 'Use machine learning to identify file types without extensions.',
    },
    {
      icon: <Cloud className="h-8 w-8 text-primary-600" />,
      title: 'Cloud Integration',
      description: 'Direct integration with popular cloud storage services.',
    },
  ];

  const fileTypes = [
    { icon: <FileText className="h-6 w-6" />, type: 'Text Files', formats: '.txt, .md, .csv, .log' },
    { icon: <Code className="h-6 w-6" />, type: 'Code Files', formats: '.js, .py, .java, .cpp, .html' },
    { icon: <Image className="h-6 w-6" />, type: 'Images', formats: '.jpg, .png, .gif, .webp, .svg' },
    { icon: <FileText className="h-6 w-6" />, type: 'Documents', formats: '.pdf, .doc, .docx, .json' },
  ];

  const platforms = [
    { icon: <Globe className="h-8 w-8" />, name: 'Web Browser', description: 'Works on any modern browser' },
    { icon: <Smartphone className="h-8 w-8" />, name: 'Mobile', description: 'Responsive design for mobile devices' },
    { icon: <Cpu className="h-8 w-8" />, name: 'Desktop', description: 'Optimized for desktop workflows' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Powerful <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Features</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover all the advanced capabilities that make ZipVision the ultimate ZIP file analysis tool.
          </p>
        </div>

        {/* Core Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Core Features</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Advanced Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Supported File Types */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Supported File Types</h2>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {fileTypes.map((type, index) => (
                <div key={index} className="text-center">
                  <div className="bg-primary-100 dark:bg-primary-900/20 w-16 h-16 rounded-2xl flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto mb-4">
                    {type.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{type.type}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{type.formats}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Support */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Cross-Platform Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="text-primary-600 dark:text-primary-400 mb-4">
                  {platform.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{platform.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{platform.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Stats */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-12">Performance & Reliability</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{'< 1s'}</div>
              <div className="opacity-90">Analysis Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100MB</div>
              <div className="opacity-90">Max File Size</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="opacity-90">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">0</div>
              <div className="opacity-90">Data Stored</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};