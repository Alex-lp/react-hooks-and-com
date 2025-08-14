# React Components & Hooks

一个现代化的 React 自定义 Hooks 库，提供 20+ 个实用的自定义 Hooks。使用 TypeScript 和 Tailwind CSS 构建，完全类型安全。

## �� 在线文档

📖 **[查看完整文档](https://alex-lp.github.io/react-hooks-and-com/)**

## 🚀 快速开始

### 安装

```bash
npm install react-hooks-and-com
# 或
yarn add react-hooks-and-com
# 或
pnpm add react-hooks-and-com
```

### 使用示例

```tsx
import { useCounter, useDebounce, useLocalStorage } from 'react-hooks-and-com';

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
      <button onClick={increment}>-</button>
      
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
}
```

## ✨ 特性

- �� **20+ 实用 Hooks** - 覆盖开发中的常见需求
- 🔒 **完全类型安全** - 使用 TypeScript 构建
- 🎨 **现代化设计** - 支持 Tailwind CSS
- �� **响应式支持** - 适配各种设备
- �� **高性能** - 优化的实现，减少不必要的重渲染
- �� **详细文档** - 每个 Hook 都有完整的使用示例

## �� 可用 Hooks

### 状态管理
- `useCounter` - 计数器 Hook
- `useToggle` - 布尔值切换 Hook
- `useLocalStorage` - 本地存储 Hook
- `usePrevious` - 获取前一个值 Hook

### 性能优化
- `useDebounce` - 防抖 Hook
- `useThrottle` - 节流 Hook
- `useUpdateEffect` - 更新时执行 Effect Hook

### 浏览器 API
- `useWindowSize` - 窗口尺寸 Hook
- `useFullscreen` - 全屏控制 Hook
- `useClipboard` - 剪贴板操作 Hook
- `useElementSize` - 元素尺寸监听 Hook

### 交互检测
- `useClickAway` - 点击外部检测 Hook
- `useInView` - 视口检测 Hook
- `useHover` - 鼠标悬浮检测 Hook
- `useMouse` - 鼠标位置监听 Hook
- `useScrolling` - 滚动状态检测 Hook

### 数据处理
- `useQueue` - 队列管理 Hook
- `usePolling` - 轮询 Hook
- `useTimeAgo` - 时间格式化 Hook
- `useEventBus` - 事件总线 Hook

### 特殊功能
- `useWatermark` - 水印添加 Hook

## �� 相关链接

- 📖 **[在线文档](https://alex-lp.github.io/react-hooks-and-com/)**
- 🐛 **[问题反馈](https://github.com/Alex-lp/react-hooks-and-com/issues)**
- 💡 **[功能建议](https://github.com/Alex-lp/react-hooks-and-com/discussions)**

## �� 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系我们

如有问题或建议，请通过以下方式联系：

- �� 创建 [GitHub Issue](https://github.com/Alex-lp/react-hooks-and-com/issues)
- 💬 参与 [GitHub Discussions](https://github.com/Alex-lp/react-hooks-and-com/discussions)

---

⭐ 如果这个项目对你有帮助，请给我们一个 Star！