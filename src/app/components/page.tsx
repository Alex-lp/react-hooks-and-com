'use client';

import { Navigation } from '@/lib/layout/Navigation';

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activePage="components" />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🚧</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">组件功能开发中</h1>
          <p className="text-lg text-gray-600 mb-8">
            目前专注于 Hooks 功能，组件功能将在后期添加更多组件时开放
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">当前状态</h2>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 已实现 20+ 个实用 Hooks</li>
              <li>• 组件功能暂时关闭</li>
              <li>• 请访问 Hooks 页面查看功能</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 