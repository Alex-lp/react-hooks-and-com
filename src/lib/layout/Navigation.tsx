import React from 'react';
import Link from 'next/link';

interface NavigationProps {
  activePage: 'home' | 'components' | 'hooks';
}

export const Navigation: React.FC<NavigationProps> = ({ activePage }) => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700">
              React Components & Hooks
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activePage === 'home'
                  ? 'text-blue-600 hover:text-blue-700 font-semibold'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              快速入门
            </Link>
            <Link 
              href="/components" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activePage === 'components'
                  ? 'text-blue-600 hover:text-blue-700 font-semibold'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              组件
            </Link>
            <Link 
              href="/hooks" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activePage === 'hooks'
                  ? 'text-blue-600 hover:text-blue-700 font-semibold'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Hooks
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
