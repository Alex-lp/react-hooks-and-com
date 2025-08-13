export type HookId =
  | 'useCounter'
  | 'usePrevious'
  | 'useToggle'
  | 'useWindowSize'
  | 'useLocalStorage'
  | 'useDebounce'
  | 'useThrottle'
  | 'useClickAway'
  | 'useInView'
  | 'useTimeAgo'
  | 'useQueue'
  | 'usePolling'
  | 'useMouse'
  | 'useFullscreen'
  | 'useEventBus'
  | 'useElementSize'
  | 'useClipboard'
  | 'useHover'
  | 'useScrolling'
  | 'useWatermark';

export interface HookExampleConfig {
  id: HookId;
  name: string;
  description: string;
  examples: {
    name: string;
    description: string;
    options: Record<string, unknown>;
  }[];
}

export const hooks: HookExampleConfig[] = [
  {
    id: 'useCounter',
    name: 'useCounter',
    description: '计数器 Hook，提供递增、递减、重置等功能',
    examples: [
      {
        name: '基础用法',
        description: '使用默认配置的计数器',
        options: {}
      },
      {
        name: '带限制的计数器',
        description: '设置最小值和最大值限制',
        options: { min: 0, max: 10, initialValue: 5 }
      }
    ]
  },
  {
    id: 'usePrevious',
    name: 'usePrevious',
    description: '获取前一个值的 Hook',
    examples: [
      {
        name: '基础用法',
        description: '跟踪状态的前一个值',
        options: {}
      }
    ]
  },
  {
    id: 'useToggle',
    name: 'useToggle',
    description: '布尔值切换 Hook',
    examples: [
      {
        name: '基础用法',
        description: '在 true 和 false 之间切换',
        options: {}
      },
      {
        name: '自定义值',
        description: '在自定义值之间切换',
        options: { trueValue: 'on', falseValue: 'off' }
      }
    ]
  },
  {
    id: 'useWindowSize',
    name: 'useWindowSize',
    description: '监听窗口尺寸变化的 Hook',
    examples: [
      {
        name: '基础用法',
        description: '实时获取窗口尺寸',
        options: {}
      },
      {
        name: '带防抖',
        description: '防抖处理窗口尺寸变化',
        options: { debounceMs: 100 }
      }
    ]
  },
  {
    id: 'useLocalStorage',
    name: 'useLocalStorage',
    description: '本地存储 Hook，提供持久化状态管理',
    examples: [
      {
        name: '基础用法',
        description: '存储字符串值',
        options: { key: 'demo-key', initialValue: 'Hello World' }
      },
      {
        name: '存储对象',
        description: '存储复杂数据结构',
        options: { key: 'user-data', initialValue: { name: 'John', age: 25 } }
      }
    ]
  },
  {
    id: 'useDebounce',
    name: 'useDebounce',
    description: '防抖 Hook，延迟执行函数',
    examples: [
      {
        name: '基础用法',
        description: '500ms 防抖延迟',
        options: { delay: 500 }
      },
      {
        name: '立即执行',
        description: '立即执行，延迟更新',
        options: { delay: 300, immediate: true }
      }
    ]
  },
  {
    id: 'useThrottle',
    name: 'useThrottle',
    description: '节流 Hook，限制函数执行频率',
    examples: [
      {
        name: '基础用法',
        description: '500ms 节流间隔',
        options: { interval: 500 }
      },
      {
        name: '带头尾执行',
        description: '在开始和结束时都执行',
        options: { interval: 300, leading: true, trailing: true }
      }
    ]
  },
  {
    id: 'useClickAway',
    name: 'useClickAway',
    description: '点击外部检测 Hook',
    examples: [
      {
        name: '基础用法',
        description: '检测点击元素外部区域',
        options: {}
      },
      {
        name: '自定义事件',
        description: '监听自定义事件类型',
        options: { events: ['mousedown', 'touchstart'] }
      }
    ]
  },
  {
    id: 'useInView',
    name: 'useInView',
    description: '视口检测 Hook，检测元素是否在视口中',
    examples: [
      {
        name: '基础用法',
        description: '检测元素是否进入视口',
        options: {}
      },
      {
        name: '自定义阈值',
        description: '设置 50% 的可见阈值',
        options: { threshold: 0.5 }
      }
    ]
  },
  {
    id: 'useTimeAgo',
    name: 'useTimeAgo',
    description: '时间格式化 Hook，将时间戳转换为相对时间',
    examples: [
      {
        name: '基础用法',
        description: '中文相对时间格式',
        options: { locale: 'zh', interval: 60000 }
      },
      {
        name: '英文格式',
        description: '英文相对时间格式',
        options: { locale: 'en', interval: 30000 }
      }
    ]
  },
  {
    id: 'useQueue',
    name: 'useQueue',
    description: '队列 Hook，提供队列数据结构的操作',
    examples: [
      {
        name: '基础用法',
        description: '基本的队列操作',
        options: { initialItems: [1, 2, 3] }
      },
      {
        name: '限制大小',
        description: '设置队列最大长度',
        options: { maxSize: 5, overflowStrategy: 'drop' }
      }
    ]
  },
  {
    id: 'usePolling',
    name: 'usePolling',
    description: '轮询 Hook，定期执行回调函数',
    examples: [
      {
        name: '基础用法',
        description: '每 5 秒执行一次',
        options: { interval: 5000, immediate: false }
      },
      {
        name: '带重试',
        description: '失败时自动重试',
        options: { interval: 3000, maxRetries: 3 }
      }
    ]
  },
  {
    id: 'useMouse',
    name: 'useMouse',
    description: '鼠标监听 Hook，获取鼠标位置信息',
    examples: [
      {
        name: '基础用法',
        description: '监听鼠标位置',
        options: {}
      },
      {
        name: '自定义目标',
        description: '监听特定元素的鼠标事件',
        options: {}
      }
    ]
  },
  {
    id: 'useFullscreen',
    name: 'useFullscreen',
    description: '全屏功能 Hook，提供进入和退出全屏的功能',
    examples: [
      {
        name: '基础用法',
        description: '基本的全屏功能',
        options: {}
      },
      {
        name: '自定义背景',
        description: '设置全屏背景颜色',
        options: { background: '#000' }
      }
    ]
  },
  {
    id: 'useEventBus',
    name: 'useEventBus',
    description: '事件总线 Hook，提供组件间的事件通信',
    examples: [
      {
        name: '基础用法',
        description: '基本的事件监听和触发',
        options: {}
      },
      {
        name: '一次性监听',
        description: '只执行一次的事件监听',
        options: {}
      }
    ]
  },
  {
    id: 'useElementSize',
    name: 'useElementSize',
    description: '元素尺寸监听 Hook，获取和监听元素尺寸变化',
    examples: [
      {
        name: '基础用法',
        description: '监听元素尺寸变化',
        options: {}
      },
      {
        name: '包含边框和内边距',
        description: '计算包含边框和内边距的尺寸',
        options: { includeBorder: true, includePadding: true }
      }
    ]
  },
  {
    id: 'useClipboard',
    name: 'useClipboard',
    description: '剪贴板功能 Hook，提供复制和读取剪贴板的功能',
    examples: [
      {
        name: '基础用法',
        description: '复制文本到剪贴板',
        options: {}
      },
      {
        name: '自定义提示',
        description: '自定义成功和错误提示',
        options: { showSuccess: true, successMessage: '复制成功！' }
      }
    ]
  },
  {
    id: 'useHover',
    name: 'useHover',
    description: '鼠标悬浮监听 Hook，监听 DOM 元素的鼠标悬浮状态',
    examples: [
      {
        name: '基础用法',
        description: '监听鼠标进入和离开事件',
        options: {}
      },
      {
        name: '延迟悬浮',
        description: '设置延迟进入和离开时间',
        options: { delayEnter: 200, delayLeave: 300 }
      }
    ]
  },
  {
    id: 'useScrolling',
    name: 'useScrolling',
    description: '滚动监听 Hook，监听 DOM 元素的滚动状态',
    examples: [
      {
        name: '基础用法',
        description: '监听滚动开始和结束状态',
        options: {}
      },
      {
        name: '自定义延迟',
        description: '设置滚动结束延迟时间',
        options: { scrollEndDelay: 300 }
      },
      {
        name: '仅垂直滚动',
        description: '只监听垂直滚动方向',
        options: { horizontal: false, vertical: true }
      }
    ]
  },
  {
    id: 'useWatermark',
    name: 'useWatermark',
    description: '给 DOM 元素添加水印，支持自定义样式',
    examples: [
      {
        name: '基础用法',
        description: '使用默认配置添加文字水印',
        options: { text: '机密文件', enabled: true }
      },
      {
        name: '自定义样式',
        description: '自定义水印的字体、颜色、透明度等',
        options: { 
          text: '内部文件', 
          fontSize: 20, 
          color: '#ff0000', 
          opacity: 0.5, 
          rotate: -30 
        }
      },
      {
        name: '图片水印',
        description: '使用图片作为水印',
        options: { 
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==',
          width: 80,
          height: 80,
          opacity: 0.3
        }
      }
    ]
  }
];

export const hookParamsMap: Record<HookId, string[]> = {
  useCounter: [
    'options.min?: number - 最小值',
    'options.max?: number - 最大值',
    'options.initialValue?: number - 初始值',
    'options.step?: number - 步长'
  ],
  usePrevious: [
    'value: T - 要跟踪的值'
  ],
  useToggle: [
    'options.trueValue?: T - 真值',
    'options.falseValue?: T - 假值',
    'options.initialValue?: T - 初始值'
  ],
  useWindowSize: [
    'options.debounceMs?: number - 防抖延迟（毫秒）',
    'options.ssr?: boolean - 是否支持服务端渲染'
  ],
  useLocalStorage: [
    'key: string - 存储键名',
    'initialValue: T - 初始值',
    'options.serializer?: Serializer<T> - 自定义序列化器'
  ],
  useDebounce: [
    'value: T - 要防抖的值',
    'options.delay?: number - 延迟时间（毫秒）',
    'options.immediate?: boolean - 是否立即执行'
  ],
  useThrottle: [
    'value: T - 要节流的值',
    'interval: number - 节流间隔（毫秒）',
    'options.leading?: boolean - 是否在开始时执行',
    'options.trailing?: boolean - 是否在结束时执行'
  ],
  useClickAway: [
    'options.onClickAway?: (event: Event) => void - 点击外部回调',
    'options.events?: string[] - 监听的事件类型',
    'options.enabled?: boolean - 是否启用'
  ],
  useInView: [
    'options.threshold?: number - 可见阈值',
    'options.rootMargin?: string - 根元素边距',
    'options.triggerOnce?: boolean - 是否只触发一次',
    'options.onEnter?: () => void - 进入视口回调',
    'options.onLeave?: () => void - 离开视口回调'
  ],
  useTimeAgo: [
    'timestamp: string | number | Date - 时间戳',
    'options.interval?: number - 更新间隔（毫秒）',
    'options.locale?: "zh" | "en" - 语言',
    'options.relative?: boolean - 是否使用相对时间',
    'options.minUnit?: TimeUnit - 最小时间单位',
    'options.autoUpdate?: boolean - 是否自动更新'
  ],
  useQueue: [
    'options.initialItems?: T[] - 初始队列元素',
    'options.maxSize?: number - 队列最大长度',
    'options.overflowStrategy?: "drop" | "error" | "shift" - 溢出策略'
  ],
  usePolling: [
    'callback: () => Promise<any> | void - 要执行的回调函数',
    'options.interval: number - 轮询间隔（毫秒）',
    'options.immediate?: boolean - 是否立即开始',
    'options.enabled?: boolean - 是否启用',
    'options.maxRetries?: number - 最大重试次数',
    'options.onError?: (error: Error) => void - 错误回调',
    'options.onSuccess?: (data: any) => void - 成功回调'
  ],
  useMouse: [
    'options.enabled?: boolean - 是否启用',
    'options.target?: Element - 监听的目标元素',
    'options.onMouseMove?: (position: MousePosition) => void - 鼠标移动回调',
    'options.onMouseEnter?: (position: MousePosition) => void - 鼠标进入回调',
    'options.onMouseLeave?: (position: MousePosition) => void - 鼠标离开回调'
  ],
  useFullscreen: [
    'options.onEnter?: () => void - 进入全屏回调',
    'options.onExit?: () => void - 退出全屏回调',
    'options.background?: string - 全屏背景颜色',
    'options.enabled?: boolean - 是否启用'
  ],
  useEventBus: [
    'eventName: string - 事件名称',
    'options.autoCleanup?: boolean - 是否自动清理',
    'options.eventBus?: Map<string, Set<Function>> - 事件总线实例'
  ],
  useElementSize: [
    'options.enabled?: boolean - 是否启用',
    'options.includeBorder?: boolean - 是否包含边框',
    'options.includePadding?: boolean - 是否包含内边距',
    'options.onSizeChange?: (size: ElementSize) => void - 尺寸变化回调',
    'options.debounceMs?: number - 防抖延迟（毫秒）'
  ],
  useClipboard: [
    'options.showSuccess?: boolean - 是否显示成功提示',
    'options.successMessage?: string - 成功提示消息',
    'options.errorMessage?: string - 错误提示消息',
    'options.onSuccess?: (text: string) => void - 成功回调',
    'options.onError?: (error: Error) => void - 错误回调',
    'options.timeout?: number - 复制超时时间（毫秒）'
  ],
  useHover: [
    'options.delay?: number - 延迟时间（毫秒）',
    'options.onEnter?: () => void - 鼠标进入回调',
    'options.onLeave?: () => void - 鼠标离开回调'
  ],
  useScrolling: [
    'options.onScrollStart?: () => void - 滚动开始回调',
    'options.onScrollEnd?: () => void - 滚动结束回调',
    'options.onScroll?: (event: Event) => void - 滚动回调',
    'options.enabled?: boolean - 是否启用',
    'options.scrollEndDelay?: number - 滚动结束延迟（毫秒）',
    'options.horizontal?: boolean - 是否监听水平滚动',
    'options.vertical?: boolean - 是否监听垂直滚动'
  ],
  useWatermark: [
    'options.text?: string - 水印文本',
    'options.image?: string - 水印图片 URL',
    'options.fontSize?: number - 水印字体大小',
    'options.color?: string - 水印字体颜色',
    'options.opacity?: number - 水印透明度',
    'options.rotate?: number - 水印旋转角度',
    'options.gap?: [number, number] - 水印间距',
    'options.offset?: [number, number] - 水印偏移量',
    'options.zIndex?: number - 水印层级',
    'options.fontFamily?: string - 水印字体',
    'options.fontWeight?: string - 水印字体粗细',
    'options.width?: number - 水印宽度',
    'options.height?: number - 水印高度',
    'options.enabled?: boolean - 是否启用水印'
  ]
};

export const hookReturnsMap: Record<HookId, string[]> = {
  useCounter: [
    'count: number - 当前计数值',
    'increment: () => void - 递增函数',
    'decrement: () => void - 递减函数',
    'reset: () => void - 重置函数',
    'setCount: (value: number) => void - 设置计数值',
    'isMin: boolean - 是否达到最小值',
    'isMax: boolean - 是否达到最大值'
  ],
  usePrevious: [
    'previousValue: T | undefined - 前一个值'
  ],
  useToggle: [
    'value: T - 当前值',
    'toggle: () => void - 切换函数',
    'setTrue: () => void - 设为真值',
    'setFalse: () => void - 设为假值'
  ],
  useWindowSize: [
    'width: number - 窗口宽度',
    'height: number - 窗口高度'
  ],
  useLocalStorage: [
    'value: T - 存储的值',
    'setValue: (value: T) => void - 设置值函数',
    'removeValue: () => void - 移除值函数',
    'isStored: boolean - 是否已存储'
  ],
  useDebounce: [
    'value: T - 原始值',
    'setValue: (value: T) => void - 设置值函数',
    'debouncedValue: T - 防抖后的值',
    'isPending: boolean - 是否正在防抖'
  ],
  useThrottle: [
    'value: T - 原始值',
    'setValue: (value: T) => void - 设置值函数',
    'throttledValue: T - 节流后的值',
    'isThrottled: boolean - 是否正在节流'
  ],
  useClickAway: [
    'ref: RefObject<T> - 要检测的元素引用'
  ],
  useInView: [
    'ref: RefObject<Element> - 要检测的元素引用',
    'inView: boolean - 是否在视口中',
    'entryCount: number - 进入视口的次数',
    'hasEntered: boolean - 是否已经进入过视口'
  ],
  useTimeAgo: [
    'timeAgo: string - 格式化后的时间字符串',
    'timestamp: Date - 原始时间戳',
    'diffInMs: number - 时间差（毫秒）',
    'isUpdating: boolean - 是否正在更新'
  ],
  useQueue: [
    'queue: T[] - 当前队列',
    'enqueue: (item: T) => void - 入队函数',
    'enqueueMany: (items: T[]) => void - 批量入队函数',
    'dequeue: () => T | undefined - 出队函数',
    'peek: () => T | undefined - 查看队首元素',
    'peekLast: () => T | undefined - 查看队尾元素',
    'clear: () => void - 清空队列',
    'isEmpty: () => boolean - 检查是否为空',
    'size: () => number - 获取队列长度',
    'isFull: () => boolean - 检查是否已满',
    'queueString: string - 队列字符串表示',
    'full: boolean - 是否已满',
    'length: number - 队列长度'
  ],
  usePolling: [
    'isPolling: boolean - 是否正在轮询',
    'start: () => void - 开始轮询',
    'stop: () => void - 停止轮询',
    'restart: () => void - 重启轮询',
    'retryCount: number - 当前重试次数',
    'error: Error | null - 最后执行的错误',
    'data: any - 最后执行的结果'
  ],
  useMouse: [
    'position: MousePosition - 当前鼠标位置',
    'isInside: boolean - 鼠标是否在目标元素内',
    'isMoving: boolean - 鼠标是否正在移动',
    'reset: () => void - 重置鼠标位置'
  ],
  useFullscreen: [
    'elementRef: RefObject<T> - 要全屏显示的元素引用',
    'isFullscreen: boolean - 是否处于全屏状态',
    'enterFullscreen: () => Promise<void> - 进入全屏',
    'exitFullscreen: () => Promise<void> - 退出全屏',
    'toggleFullscreen: () => Promise<void> - 切换全屏状态',
    'isSupported: boolean - 是否支持全屏',
    'error: Error | null - 错误信息'
  ],
  useEventBus: [
    'on: (callback: Function) => () => void - 监听事件',
    'once: (callback: Function) => () => void - 监听事件（只执行一次）',
    'emit: (data?: any) => void - 触发事件',
    'off: (callback: Function) => void - 移除事件监听器',
    'reset: () => void - 清空所有事件监听器',
    'listenerCount: () => number - 获取当前事件监听器数量'
  ],
  useElementSize: [
    'ref: RefObject<T> - 要监听的元素引用',
    'size: ElementSize - 元素尺寸信息',
    'isObserving: boolean - 是否正在监听',
    'startObserving: () => void - 开始监听',
    'stopObserving: () => void - 停止监听',
    'updateSize: () => void - 手动更新尺寸'
  ],
  useClipboard: [
    'copyToClipboard: (text: string, options?: UseClipboardOptions) => Promise<void> - 复制文本到剪贴板',
    'readFromClipboard: () => Promise<string> - 从剪贴板读取文本',
    'isCopying: boolean - 是否正在复制',
    'isCopied: boolean - 是否已复制',
    'copiedText: string | null - 复制的文本',
    'error: Error | null - 错误信息',
    'canUseClipboardApi: boolean - 是否支持剪贴板 API',
    'reset: () => void - 重置状态'
  ],
  useHover: [
    'ref: RefObject<T> - 要监听的元素引用',
    'isHovered: boolean - 是否正在悬浮',
    'hoverCount: number - 悬浮次数'
  ],
  useScrolling: [
    'ref: RefObject<T> - 要监听的元素引用',
    'isScrolling: boolean - 是否正在滚动',
    'scrollDirection: "horizontal" | "vertical" | "both" | null - 滚动方向',
    'scrollPosition: ScrollPosition - 滚动位置信息',
    'setScrolling: (scrolling: boolean) => void - 手动设置滚动状态'
  ],
  useWatermark: [
    'ref: RefObject<HTMLElement> - 要添加水印的元素引用',
    'setOptions: (options: Partial<WatermarkOptions>) => void - 设置水印选项',
    'clear: () => void - 清除水印',
    'options: WatermarkOptions - 当前水印选项'
  ]
};
