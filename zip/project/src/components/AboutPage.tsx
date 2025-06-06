import React from 'react';
import { Shield, Zap, Users, Award, Target, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const team = [
    {
      name: 'Alex Johnson',
      role: 'Lead Developer',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Cybersecurity expert with 8+ years in file analysis tools',
    },
    {
      name: 'Sarah Chen',
      role: 'UI/UX Designer',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Design specialist focused on intuitive user experiences',
    },
    {
      name: 'Mike Rodriguez',
      role: 'Security Analyst',
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Former penetration tester with expertise in malware detection',
    },
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8 text-primary-500" />,
      title: 'Security First',
      description: 'We prioritize your data security and privacy above all else.',
    },
    {
      icon: <Zap className="h-8 w-8 text-secondary-500" />,
      title: 'Innovation',
      description: 'Constantly pushing the boundaries of what\'s possible with file analysis.',
    },
    {
      icon: <Users className="h-8 w-8 text-accent-500" />,
      title: 'User-Centric',
      description: 'Every feature is designed with our users\' needs and workflows in mind.',
    },
    {
      icon: <Award className="h-8 w-8 text-success-500" />,
      title: 'Excellence',
      description: 'We strive for perfection in every aspect of our product.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">ZipVision</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing how professionals analyze and explore ZIP archives with cutting-edge technology, 
            advanced security scanning, and an intuitive user experience.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 mb-16 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                To provide developers, security professionals, and IT teams with the most powerful and secure 
                ZIP file analysis tools available. We believe that understanding file contents shouldn't require 
                compromise on security or usability.
              </p>
            </div>
            <div className="text-center lg:text-right">
              <div className="inline-block bg-gradient-to-br from-accent-400/20 to-warning-400/20 rounded-full p-8">
                <Heart className="h-24 w-24 text-accent-500 mx-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">By the Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">50K+</div>
              <div className="text-gray-600 dark:text-gray-300">Files Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">1,200+</div>
              <div className="text-gray-600 dark:text-gray-300">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-600 dark:text-accent-400 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-300">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-success-600 dark:text-success-400 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};