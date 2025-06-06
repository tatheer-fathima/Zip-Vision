import React from 'react';
import { Archive, Shield, BarChart3, Search, Eye, Zap, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: <Archive className="h-8 w-8 text-primary-500" />,
      title: 'Smart ZIP Explorer',
      description: 'Navigate through ZIP archives without extraction, with instant file tree visualization.',
    },
    {
      icon: <Eye className="h-8 w-8 text-secondary-500" />,
      title: 'Live File Preview',
      description: 'Preview text, images, JSON, and code files directly in your browser with syntax highlighting.',
    },
    {
      icon: <Shield className="h-8 w-8 text-accent-500" />,
      title: 'Security Scanner',
      description: 'Automatically detect potentially dangerous files and suspicious content patterns.',
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-success-500" />,
      title: 'Advanced Analytics',
      description: 'Comprehensive file analysis with charts, compression ratios, and detailed statistics.',
    },
    {
      icon: <Search className="h-8 w-8 text-warning-500" />,
      title: 'Smart Search',
      description: 'Find files instantly with powerful filtering by type, size, name, and content.',
    },
    {
      icon: <Zap className="h-8 w-8 text-error-500" />,
      title: 'Lightning Fast',
      description: 'Built with modern web technologies for optimal performance and user experience.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
                Explore ZIP Files
                <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Like Never Before
                </span>
              </h1>
              <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Advanced ZIP file visualization with security scanning, file preview, analytics, and more. 
                No extraction needed, just pure exploration power in your browser.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={onGetStarted}
                  className="group bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-secondary-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Start Exploring
                  <ChevronRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-primary-600 text-primary-600 dark:text-primary-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
                  View Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-10 w-48 h-48 bg-gradient-to-br from-accent-400/20 to-warning-400/20 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-40 h-40 bg-gradient-to-br from-secondary-400/20 to-success-400/20 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to analyze, explore, and understand ZIP archives with professional-grade tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-300 dark:hover:border-primary-600"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Your ZIP Workflow?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of users who have already discovered the power of advanced ZIP visualization.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-secondary-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started for Free
          </button>
        </div>
      </div>
    </div>
  );
};