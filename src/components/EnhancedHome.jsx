import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../admin/AuthContext';
import { ThemeToggleFloating } from './ThemeToggle';

const EnhancedHome = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: '🚀',
      title: 'Fast Learning',
      description: 'Accelerate your skills with AI-powered courses and personalized learning paths',
      color: 'from-blue-500 to-cyan-500',
      delay: '0ms'
    },
    {
      icon: '💡',
      title: 'Smart Insights',
      description: 'Get intelligent recommendations based on your learning style and goals',
      color: 'from-purple-500 to-pink-500',
      delay: '200ms'
    },
    {
      icon: '🏆',
      title: 'Achievements',
      description: 'Earn certificates, badges and compete on leaderboards with peers',
      color: 'from-green-500 to-emerald-500',
      delay: '400ms'
    },
    {
      icon: '🤖',
      title: 'AI Resume Analysis',
      description: 'Get AI-powered feedback on your resume and match with job requirements',
      color: 'from-orange-500 to-red-500',
      delay: '600ms'
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed analytics and insights',
      color: 'from-indigo-500 to-purple-500',
      delay: '800ms'
    },
    {
      icon: '🎯',
      title: 'Challenge System',
      description: 'Test your skills with coding challenges and real-world projects',
      color: 'from-pink-500 to-rose-500',
      delay: '1000ms'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Active Learners', icon: '👥' },
    { value: '500+', label: 'Courses Available', icon: '📚' },
    { value: '98%', label: 'Success Rate', icon: '⭐' },
    { value: '24/7', label: 'Support Available', icon: '💬' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg dark:to-gray-900 transition-colors duration-500">
      
      {/* Hero Section with 3D Effect */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-20 w-72 h-72 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-float" />
          <div className="absolute top-40 -right-20 w-72 h-72 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-float-slow" />
          <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-float-fast" />
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-gradient-primary text-white text-sm font-semibold shadow-lg animate-pulse-slow">
                  🎉 Welcome to the Future of Learning
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block text-gray-900 dark:text-white">Learn, Grow,</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 animate-gradient bg-[length:200%_200%]">
                  Excel with AI
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-dark-muted leading-relaxed">
                Transform your career with AI-powered education. Get personalized learning paths, 
                resume analysis, and compete in coding challenges.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {!isAuthenticated ? (
                  <>
                    <button
                      onClick={() => navigate('/register')}
                      className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-lg shadow-2xl hover:shadow-glow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden"
                    >
                      <span className="relative z-10">Get Started Free</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                    <button
                      onClick={() => navigate('/login')}
                      className="px-8 py-4 rounded-2xl border-2 border-primary-500 text-primary-600 dark:text-primary-400 font-bold text-lg hover:bg-primary-500 hover:text-white transform hover:scale-105 transition-all duration-300"
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg shadow-2xl hover:shadow-glow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Go to Dashboard
                  </button>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-xl bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm border border-gray-200 dark:border-dark-border transform hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-dark-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - 3D Illustration */}
            <div className={`relative ${isVisible ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'}`}>
              <div className="relative perspective-1000">
                {/* Main card with 3D effect */}
                <div className="relative transform-3d hover:rotate-y-12 hover:rotate-x-6 transition-transform duration-700">
                  <div className="card p-8 bg-gradient-to-br from-white to-gray-50 dark:from-dark-card dark:to-gray-800">
                    <div className="space-y-6">
                      {/* Mock course card */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center text-3xl shadow-lg animate-float">
                          📚
                        </div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                        </div>
                      </div>

                      {/* Mock progress bars */}
                      {[80, 60, 40].map((progress, index) => (
                        <div key={index} className="space-y-2" style={{ animationDelay: `${index * 200}ms` }}>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-dark-muted">Course {index + 1}</span>
                            <span className="text-primary-500 font-semibold">{progress}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      ))}

                      {/* Mock achievement badges */}
                      <div className="flex gap-2 pt-4">
                        {['🏆', '⭐', '🎯', '💎'].map((emoji, index) => (
                          <div
                            key={index}
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xl shadow-lg transform hover:scale-110 hover:rotate-12 transition-all duration-300 cursor-pointer"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            {emoji}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating elements around the card */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-4xl shadow-2xl animate-float transform hover:rotate-12 transition-all duration-300">
                    ✓
                  </div>
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center text-3xl shadow-2xl animate-float-slow transform hover:rotate-12 transition-all duration-300">
                    🚀
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-white dark:bg-gray-900 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="gradient-text">4ducate</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-dark-muted max-w-2xl mx-auto">
              Experience the next generation of online learning with cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group card card-3d p-8 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: feature.delay }}
              >
                {/* Icon with gradient background */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-4xl mb-6 shadow-lg group-hover:shadow-glow-lg transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:gradient-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-dark-muted leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect line */}
                <div className="mt-6 h-1 w-0 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-500 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIzIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <h2 className="text-4xl lg:text-6xl font-bold text-white">
              Ready to Transform Your Future?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join thousands of learners who are already advancing their careers with 4ducate.
              Start your journey today—completely free!
            </p>
            
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => navigate('/register')}
                  className="group px-10 py-5 rounded-2xl bg-white text-primary-600 font-bold text-lg shadow-2xl hover:shadow-glow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Start Learning Now
                  <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                </button>
                <button
                  onClick={() => navigate('/courses')}
                  className="px-10 py-5 rounded-2xl border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-300"
                >
                  Browse Courses
                </button>
              </div>
            )}

            {/* Trust indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              {[
                { icon: '🔒', text: 'Secure & Private' },
                { icon: '💯', text: 'Money-back Guarantee' },
                { icon: '⚡', text: 'Instant Access' },
                { icon: '🌟', text: '5-Star Rated' }
              ].map((item, index) => (
                <div key={index} className="text-white text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <div className="font-semibold">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Theme Toggle */}
      <ThemeToggleFloating />
    </div>
  );
};

export default EnhancedHome;
