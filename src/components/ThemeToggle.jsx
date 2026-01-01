import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-14 h-14 rounded-full
                 bg-gradient-to-br from-primary-400 to-secondary-500
                 hover:from-primary-500 hover:to-secondary-600
                 shadow-lg hover:shadow-xl hover:shadow-primary-500/50
                 transition-all duration-300 transform hover:scale-110 active:scale-95
                 group overflow-hidden"
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      
      {/* Sun Icon */}
      <svg
        className={`absolute w-6 h-6 text-white transition-all duration-500 transform ${
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon Icon */}
      <svg
        className={`absolute w-6 h-6 text-white transition-all duration-500 transform ${
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>

      {/* Ripple effect on click */}
      <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-0 group-active:opacity-75" />
    </button>
  );
};

// Compact version for navbar
export const ThemeToggleCompact = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg
                 bg-gray-100 dark:bg-dark-card
                 hover:bg-gray-200 dark:hover:bg-gray-700
                 transition-all duration-200 group"
      aria-label="Toggle theme"
    >
      {/* Sun Icon */}
      <svg
        className={`absolute w-5 h-5 text-yellow-500 transition-all duration-300 ${
          isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clipRule="evenodd"
        />
      </svg>

      {/* Moon Icon */}
      <svg
        className={`absolute w-5 h-5 text-purple-500 transition-all duration-300 ${
          isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    </button>
  );
};

// Floating theme toggle with 3D effect
export const ThemeToggleFloating = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={toggleTheme}
        className="relative flex items-center justify-center w-16 h-16 rounded-2xl
                   bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500
                   shadow-2xl hover:shadow-glow-lg
                   transition-all duration-500
                   transform hover:scale-110 hover:rotate-12 active:scale-95
                   group perspective-1000"
        aria-label="Toggle theme"
      >
        {/* 3D Rotating card effect */}
        <div className="relative w-full h-full transform-3d transition-transform duration-700 group-hover:rotate-y-180">
          {/* Front face - Sun */}
          <div className={`absolute inset-0 flex items-center justify-center backface-hidden ${isDark ? 'rotate-y-180' : ''}`}>
            <svg className="w-8 h-8 text-white animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Back face - Moon */}
          <div className={`absolute inset-0 flex items-center justify-center backface-hidden rotate-y-180 ${isDark ? '' : 'rotate-y-180'}`}>
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 rounded-lg
                      bg-gray-900 dark:bg-white text-white dark:text-gray-900
                      text-sm font-medium whitespace-nowrap
                      opacity-0 group-hover:opacity-100
                      transform translate-y-2 group-hover:translate-y-0
                      transition-all duration-200 pointer-events-none">
        {isDark ? 'Light Mode' : 'Dark Mode'}
        <div className="absolute top-full right-4 w-2 h-2 bg-gray-900 dark:bg-white transform rotate-45 -mt-1" />
      </div>
    </div>
  );
};

export default ThemeToggle;
