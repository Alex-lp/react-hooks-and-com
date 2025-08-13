import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                React Components & Hooks
              </h1>
            </div>
            <div className="flex items-center space-x-8">
              <Link 
                href="/" 
                className="text-blue-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium font-semibold"
              >
                快速入门
              </Link>
              <Link 
                href="/components" 
                className="text-gray-400 px-3 py-2 rounded-md text-sm font-medium cursor-not-allowed"
                title="组件功能开发中"
              >
                组件 🚧
              </Link>
              <Link 
                href="/hooks" 
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Hooks
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            欢迎使用 React Components & Hooks
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            一个现代化的 React 自定义 Hooks 库
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/hooks"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              查看 Hooks
            </Link>
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">🚀 快速开始</h3>
          
          <div className="space-y-8">
            {/* Installation */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">安装</h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`npm install react-hooks-and-com
# 或
yarn add react-hooks-and-com
# 或
pnpm add react-hooks-and-com`}
                </pre>
              </div>
            </div>

            {/* Usage Examples */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">使用示例</h4>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Hooks 使用</h5>
                <div className="bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
                  <pre className="text-sm">
{`import { useCounter, useDebounce, useLocalStorage } from 'react-hooks-and-com';

function App() {
  // 计数器
  const { count, increment, decrement } = useCounter({ min: 0, max: 10 });
  
  // 防抖搜索
  const { value, setValue, debouncedValue } = useDebounce('', { delay: 500 });
  
  // 本地存储
  const { value: theme, setValue: setTheme } = useLocalStorage('theme', 'light');

  return (
    <div>
      <div>计数: {count}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      
      <input 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        placeholder="搜索..."
      />
      <div>搜索结果: {debouncedValue}</div>
      
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        切换主题: {theme}
      </button>
    </div>
  );
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">🚀 快速开始</h3>
            <p className="text-gray-600">
              安装包并开始使用我们的自定义 hooks
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">⚡ 自定义 Hooks</h3>
            <p className="text-gray-600">
              20+ 个实用的自定义 hooks，提升开发效率
            </p>
          </div>
        </div>

        {/* More Info */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            需要更多帮助？
          </h3>
          <p className="text-gray-600 mb-6">
            查看完整的 hooks 文档，了解所有可用的功能和配置选项。
          </p>
          <div className="flex justify-center">
            <Link
              href="/hooks"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
            >
              Hooks 文档
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
