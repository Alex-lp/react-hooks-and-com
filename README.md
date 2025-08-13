# React Components & Hooks

一个现代化的 React 组件和自定义 Hooks 库，使用 TypeScript 和 Tailwind CSS 构建。提供 20+ 个实用的自定义 Hooks 和可复用的 UI 组件。

## 🚀 快速开始

### 安装

```bash
npm install react-hooks-and-com
# 或
yarn add react-hooks-and-com
# 或
pnpm add react-hooks-and-com
```

### 使用组件

> **注意**: 组件功能目前正在开发中，暂时只提供 Hooks 功能。

```tsx
// 组件功能将在后期添加更多组件时开放
// import { Button } from 'react-hooks-and-com';
```

### 使用 Hooks

```tsx
import { useCounter, useDebounce, useLocalStorage } from 'react-hooks-and-com';
function Counter() {
  const { count, increment, decrement, reset } = useCounter({
    initialValue: 0,
    min: 0,
    max: 10,
    step: 1
  });

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}
```

## 📦 包含内容

### 组件 (Components)

> **开发中**: 组件功能将在后期添加更多组件时开放
- 目前专注于 Hooks 功能开发
- 组件功能暂时关闭

### Hooks (20+ 个实用 Hooks)

#### 🎯 状态管理
- **useCounter** - 计数器管理 hook
- **useToggle** - 切换状态 hook
- **usePrevious** - 获取前一个值
- **useLocalStorage** - 本地存储管理

#### ⚡ 性能优化
- **useDebounce** - 防抖 hook
- **useThrottle** - 节流 hook
- **useUpdateEffect** - 更新时执行 effect

#### 🌐 浏览器 API
- **useWindowSize** - 窗口尺寸监听
- **useFullscreen** - 全屏功能
- **useClipboard** - 剪贴板操作

#### 🖱️ 交互处理
- **useClickAway** - 点击外部检测
- **useInView** - 视口检测
- **useHover** - 鼠标悬浮监听
- **useMouse** - 鼠标位置监听
- **useScrolling** - 滚动状态监听

#### 🎨 UI 增强
- **useElementSize** - 元素尺寸监听
- **useWatermark** - 水印功能

#### ⏰ 时间处理
- **useTimeAgo** - 时间格式化
- **usePolling** - 轮询功能

#### 🔄 数据管理
- **useQueue** - 队列数据结构
- **useEventBus** - 事件总线

## 📚 使用示例

### 基础用法示例

```tsx
import { 
  useCounter, 
  useDebounce, 
  useLocalStorage, 
  useClickAway,
  useWatermark 
} from 'react-hooks-and-com';

function App() {
  // 计数器
  const { count, increment, decrement } = useCounter({ min: 0, max: 10 });
  
  // 防抖搜索
  const { value, setValue, debouncedValue } = useDebounce('', { delay: 500 });
  
  // 本地存储
  const { value: theme, setValue: setTheme } = useLocalStorage('theme', 'light');
  
  // 点击外部关闭
  const ref = useClickAway({ onClickAway: () => console.log('点击外部') });
  
  // 水印
  const { ref: watermarkRef } = useWatermark({ 
    text: '机密文件', 
    opacity: 0.3 
  });

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
      
      <div ref={watermarkRef} className="p-4 border">
        <h1>重要文档</h1>
        <p>这是需要添加水印保护的内容...</p>
      </div>
    </div>
  );
}
```








## 🛠️ 开发

### 本地开发

```bash
# 克隆项目
git clone <repository-url>
cd react-hooks-and-com

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建库

```bash
# 构建库文件
npm run build:lib
```

### 发布到 npm

```bash
# 发布前会自动构建
npm publish
```

## 📚 文档

访问 [http://localhost:3000](http://localhost:3000) 查看完整的组件和 hooks 文档。

## 🎨 技术栈

- **React 19** - 最新的 React 版本
- **TypeScript** - 完整的类型支持
- **Tailwind CSS** - 现代化的 CSS 框架
- **Next.js 15** - React 应用框架
- **Rollup** - 库打包工具

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如果你有任何问题或建议，请创建 Issue 或联系维护者。
