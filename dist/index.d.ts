import React$1, { RefObject } from 'react';

interface UseCounterOptions {
    initialValue?: number;
    min?: number;
    max?: number;
    step?: number;
}
interface UseCounterReturn {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
    setCount: (value: number) => void;
    isMin: boolean;
    isMax: boolean;
}
declare const useCounter: (options?: UseCounterOptions) => UseCounterReturn;

declare const usePrevious: <T>(value: T) => T | undefined;

interface UseToggleOptions<T = boolean> {
    initialValue?: T;
    trueValue?: T;
    falseValue?: T;
}
interface UseToggleReturn<T> {
    value: T;
    toggle: () => void;
    setValue: (value: T) => void;
    setTrue: () => void;
    setFalse: () => void;
}
declare const useToggle: <T = boolean>(options?: UseToggleOptions<T>) => UseToggleReturn<T>;

interface WindowSize {
    width: number;
    height: number;
}
interface UseWindowSizeOptions {
    debounceMs?: number;
    initialSize?: WindowSize;
}
declare const useWindowSize: (options?: UseWindowSizeOptions) => WindowSize;

interface Serializer<T> {
    stringify: (value: T) => string;
    parse: (value: string) => T;
}
interface UseLocalStorageOptions<T = unknown> {
    serializer?: Serializer<T>;
    onError?: (error: Error) => void;
}
interface UseLocalStorageReturn<T> {
    value: T;
    setValue: (value: T | ((prev: T) => T)) => void;
    removeValue: () => void;
    isStored: boolean;
}
declare const useLocalStorage: <T>(key: string, initialValue: T, options?: UseLocalStorageOptions<T>) => UseLocalStorageReturn<T>;

interface UseDebounceOptions {
    delay?: number;
    immediate?: boolean;
}
interface UseDebounceReturn<T> {
    value: T;
    setValue: (value: T) => void;
    debouncedValue: T;
    isPending: boolean;
}
declare const useDebounce: <T>(initialValue: T, options?: UseDebounceOptions) => UseDebounceReturn<T>;

interface UseThrottleOptions {
    leading?: boolean;
    trailing?: boolean;
}
interface UseThrottleReturn<T> {
    value: T;
    setValue: (value: T) => void;
    throttledValue: T;
    isThrottled: boolean;
}
declare const useThrottle: <T>(initialValue: T, interval?: number, options?: UseThrottleOptions) => UseThrottleReturn<T>;

interface UseClickAwayOptions {
    /** 是否启用点击外部检测 */
    enabled?: boolean;
    /** 要监听的事件类型 */
    events?: ('mousedown' | 'touchstart')[];
    /** 点击外部时的回调函数 */
    onClickAway?: (event: Event) => void;
}
interface UseClickAwayReturn<T extends HTMLElement = HTMLElement> {
    /** 要检测点击外部的元素引用 */
    ref: RefObject<T | null>;
}
/**
 * 点击外部检测 Hook
 * 用于检测用户是否点击了指定元素之外的区域
 *
 * @param options 配置选项
 * @returns 返回元素引用
 *
 * @example
 * ```tsx
 * const { ref } = useClickAway({
 *   onClickAway: () => console.log('点击了外部'),
 *   events: ['mousedown', 'touchstart']
 * });
 *
 * return <div ref={ref}>点击外部会触发回调</div>;
 * ```
 */
declare const useClickAway: <T extends HTMLElement = HTMLElement>(options?: UseClickAwayOptions) => UseClickAwayReturn<T>;

interface UseInViewOptions extends IntersectionObserverInit {
    /** 是否在初始渲染时触发回调 */
    triggerOnce?: boolean;
    /** 元素进入视口时的回调 */
    onEnter?: () => void;
    /** 元素离开视口时的回调 */
    onLeave?: () => void;
}
interface UseInViewReturn {
    /** 要检测的元素引用 */
    ref: RefObject<Element | null>;
    /** 元素是否在视口中 */
    inView: boolean;
    /** 元素进入视口的次数 */
    entryCount: number;
    /** 元素是否已经进入过视口（仅在 triggerOnce 为 true 时有效） */
    hasEntered: boolean;
}
/**
 * 视口检测 Hook
 * 用于检测元素是否进入或离开视口
 *
 * @param options 配置选项
 * @returns 返回元素引用和视口状态
 *
 * @example
 * ```tsx
 * const { ref, inView, entryCount } = useInView({
 *   threshold: 0.5,
 *   rootMargin: '0px 0px -100px 0px',
 *   onEnter: () => console.log('元素进入视口'),
 *   onLeave: () => console.log('元素离开视口')
 * });
 *
 * return <div ref={ref}>当前在视口中: {inView ? '是' : '否'}</div>;
 * ```
 */
declare const useInView: (options?: UseInViewOptions) => UseInViewReturn;

type TimeUnit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
type Locale = 'zh' | 'en';
interface UseTimeAgoOptions {
    /** 更新时间间隔（毫秒） */
    interval?: number;
    /** 语言 */
    locale?: Locale;
    /** 是否使用相对时间格式 */
    relative?: boolean;
    /** 最小时间单位 */
    minUnit?: TimeUnit;
    /** 是否自动更新 */
    autoUpdate?: boolean;
}
interface UseTimeAgoReturn {
    /** 格式化后的时间字符串 */
    timeAgo: string;
    /** 原始时间戳 */
    timestamp: Date;
    /** 时间差（毫秒） */
    diffInMs: number;
    /** 是否正在更新 */
    isUpdating: boolean;
}
/**
 * 自定义时间格式化 Hook
 * 将时间戳转换为相对时间格式（如"3分钟前"）
 *
 * @param timestamp 时间戳（数字、字符串或 Date 对象）
 * @param options 配置选项
 * @returns 返回格式化后的时间字符串和相关状态
 *
 * @example
 * ```tsx
 * const { timeAgo, diffInMs } = useTimeAgo(new Date('2023-01-01'), {
 *   interval: 60000,
 *   locale: 'zh',
 *   relative: true
 * });
 *
 * return <div>发布时间: {timeAgo}</div>;
 * ```
 */
declare const useTimeAgo: (timestamp: string | number | Date, options?: UseTimeAgoOptions) => UseTimeAgoReturn;

interface UseQueueOptions<T> {
    /** 初始队列元素 */
    initialItems?: T[];
    /** 队列最大长度 */
    maxSize?: number;
    /** 队列满时的处理策略 */
    overflowStrategy?: 'drop' | 'error' | 'shift';
}
interface UseQueueReturn<T> {
    /** 当前队列 */
    queue: T[];
    /** 入队 - 添加元素到队列末尾 */
    enqueue: (item: T) => void;
    /** 批量入队 - 添加多个元素到队列末尾 */
    enqueueMany: (items: T[]) => void;
    /** 出队 - 移除并返回队列的第一个元素 */
    dequeue: () => T | undefined;
    /** 查看队列的第一个元素（不移除） */
    peek: () => T | undefined;
    /** 查看队列的最后一个元素 */
    peekLast: () => T | undefined;
    /** 清空队列 */
    clear: () => void;
    /** 检查队列是否为空 */
    isEmpty: () => boolean;
    /** 获取队列长度 */
    size: () => number;
    /** 检查队列是否已满 */
    isFull: () => boolean;
    /** 队列的字符串表示 */
    queueString: string;
    /** 队列是否已满 */
    full: boolean;
    /** 队列长度 */
    length: number;
}
/**
 * 队列 Hook
 * 提供队列数据结构的操作功能
 *
 * @template T - 队列元素的类型
 * @param options 配置选项
 * @returns 返回队列操作方法和状态
 *
 * @example
 * ```tsx
 * const { queue, enqueue, dequeue, size, isEmpty } = useQueue<number>({
 *   initialItems: [1, 2, 3],
 *   maxSize: 10,
 *   overflowStrategy: 'drop'
 * });
 *
 * return (
 *   <div>
 *     <button onClick={() => enqueue(Math.random())}>入队</button>
 *     <button onClick={() => dequeue()}>出队</button>
 *     <p>队列长度: {size()}</p>
 *     <p>队列内容: {queue.join(', ')}</p>
 *   </div>
 * );
 * ```
 */
declare const useQueue: <T>(options?: UseQueueOptions<T>) => UseQueueReturn<T>;

interface UsePollingOptions {
    /** 轮询间隔（毫秒） */
    interval: number;
    /** 是否立即开始轮询 */
    immediate?: boolean;
    /** 是否启用轮询 */
    enabled?: boolean;
    /** 最大重试次数 */
    maxRetries?: number;
    /** 轮询失败时的回调 */
    onError?: (error: Error) => void;
    /** 轮询成功时的回调 */
    onSuccess?: (data: any) => void;
}
interface UsePollingReturn {
    /** 是否正在轮询 */
    isPolling: boolean;
    /** 开始轮询 */
    start: () => void;
    /** 停止轮询 */
    stop: () => void;
    /** 重启轮询 */
    restart: () => void;
    /** 当前重试次数 */
    retryCount: number;
    /** 最后执行的错误 */
    error: Error | null;
    /** 最后执行的结果 */
    data: any;
}
/**
 * 轮询 Hook
 * 用于定期执行回调函数，常用于获取远程数据或检查任务状态
 *
 * @param callback 要执行的回调函数
 * @param options 配置选项
 * @returns 返回轮询控制方法和状态
 *
 * @example
 * ```tsx
 * const { isPolling, start, stop, error, data } = usePolling(
 *   async () => {
 *     const response = await fetch('/api/status');
 *     return response.json();
 *   },
 *   {
 *     interval: 5000,
 *     immediate: true,
 *     onSuccess: (data) => console.log('轮询成功:', data),
 *     onError: (error) => console.error('轮询失败:', error)
 *   }
 * );
 *
 * return (
 *   <div>
 *     <button onClick={start} disabled={isPolling}>开始轮询</button>
 *     <button onClick={stop} disabled={!isPolling}>停止轮询</button>
 *     <p>状态: {isPolling ? '轮询中' : '已停止'}</p>
 *     {error && <p>错误: {error.message}</p>}
 *     {data && <p>数据: {JSON.stringify(data)}</p>}
 *   </div>
 * );
 * ```
 */
declare const usePolling: (callback: () => Promise<any> | void, options: UsePollingOptions) => UsePollingReturn;

interface MousePosition {
    /** 鼠标 X 坐标 */
    x: number;
    /** 鼠标 Y 坐标 */
    y: number;
    /** 鼠标相对于页面的 X 坐标 */
    pageX: number;
    /** 鼠标相对于页面的 Y 坐标 */
    pageY: number;
    /** 鼠标相对于屏幕的 X 坐标 */
    screenX: number;
    /** 鼠标相对于屏幕的 Y 坐标 */
    screenY: number;
    /** 鼠标相对于元素的 X 坐标 */
    clientX: number;
    /** 鼠标相对于元素的 Y 坐标 */
    clientY: number;
}
interface UseMouseOptions {
    /** 是否启用鼠标监听 */
    enabled?: boolean;
    /** 要监听的元素（默认为 window） */
    target?: Element | null;
    /** 鼠标移动时的回调 */
    onMouseMove?: (position: MousePosition) => void;
    /** 鼠标进入时的回调 */
    onMouseEnter?: (position: MousePosition) => void;
    /** 鼠标离开时的回调 */
    onMouseLeave?: (position: MousePosition) => void;
}
interface UseMouseReturn {
    /** 当前鼠标位置 */
    position: MousePosition;
    /** 鼠标是否在目标元素内 */
    isInside: boolean;
    /** 鼠标是否正在移动 */
    isMoving: boolean;
    /** 重置鼠标位置 */
    reset: () => void;
}
/**
 * 鼠标监听 Hook
 * 用于获取和监听鼠标的位置信息
 *
 * @param options 配置选项
 * @returns 返回鼠标位置和状态
 *
 * @example
 * ```tsx
 * const { position, isInside, isMoving } = useMouse({
 *   target: document.body,
 *   onMouseMove: (pos) => console.log('鼠标位置:', pos),
 *   onMouseEnter: () => console.log('鼠标进入'),
 *   onMouseLeave: () => console.log('鼠标离开')
 * });
 *
 * return (
 *   <div>
 *     <p>鼠标位置: ({position.x}, {position.y})</p>
 *     <p>是否在元素内: {isInside ? '是' : '否'}</p>
 *     <p>是否在移动: {isMoving ? '是' : '否'}</p>
 *   </div>
 * );
 * ```
 */
declare const useMouse: (options?: UseMouseOptions) => UseMouseReturn;

interface UseFullscreenOptions {
    /** 进入全屏时的回调 */
    onEnter?: () => void;
    /** 退出全屏时的回调 */
    onExit?: () => void;
    /** 全屏时背景颜色 */
    background?: string;
    /** 是否启用全屏功能 */
    enabled?: boolean;
}
interface UseFullscreenReturn<T extends HTMLElement = HTMLDivElement> {
    /** 要全屏显示的元素引用 */
    elementRef: RefObject<T | null>;
    /** 是否处于全屏状态 */
    isFullscreen: boolean;
    /** 进入全屏 */
    enterFullscreen: () => Promise<void>;
    /** 退出全屏 */
    exitFullscreen: () => Promise<void>;
    /** 切换全屏状态 */
    toggleFullscreen: () => Promise<void>;
    /** 是否支持全屏 */
    isSupported: boolean;
    /** 错误信息 */
    error: Error | null;
}
/**
 * 全屏功能 Hook
 * 提供进入、退出和切换全屏的功能
 *
 * @template T - 元素类型
 * @param options 配置选项
 * @returns 返回全屏操作相关的方法和状态
 *
 * @example
 * ```tsx
 * const { elementRef, isFullscreen, enterFullscreen, exitFullscreen, toggleFullscreen } = useFullscreen({
 *   onEnter: () => console.log('进入全屏'),
 *   onExit: () => console.log('退出全屏'),
 *   background: '#000'
 * });
 *
 * return (
 *   <div ref={elementRef} className="w-64 h-48 bg-blue-500">
 *     <button onClick={enterFullscreen}>进入全屏</button>
 *     <button onClick={exitFullscreen}>退出全屏</button>
 *     <button onClick={toggleFullscreen}>切换全屏</button>
 *     <p>全屏状态: {isFullscreen ? '是' : '否'}</p>
 *   </div>
 * );
 * ```
 */
declare const useFullscreen: <T extends HTMLElement = HTMLDivElement>(options?: UseFullscreenOptions) => UseFullscreenReturn<T>;

interface UseEventBusOptions {
    /** 是否在组件卸载时自动清理事件监听器 */
    autoCleanup?: boolean;
    /** 事件总线实例（可选，默认使用全局实例） */
    eventBus?: Map<string, Set<Function>>;
}
interface UseEventBusReturn {
    /** 监听事件 */
    on: (callback: Function) => () => void;
    /** 监听事件（只执行一次） */
    once: (callback: Function) => () => void;
    /** 触发事件 */
    emit: (data?: any) => void;
    /** 移除事件监听器 */
    off: (callback: Function) => void;
    /** 清空所有事件监听器 */
    reset: () => void;
    /** 获取当前事件监听器数量 */
    listenerCount: () => number;
}
/**
 * 事件总线 Hook
 * 提供组件间的事件通信功能
 *
 * @param eventName 事件名称
 * @param options 配置选项
 * @returns 返回事件总线操作方法
 *
 * @example
 * ```tsx
 * const { on, emit, off, reset } = useEventBus('user-login');
 *
 * useEffect(() => {
 *   const unsubscribe = on((userData) => {
 *     console.log('用户登录:', userData);
 *   });
 *
 *   return unsubscribe; // 自动清理
 * }, [on]);
 *
 * const handleLogin = () => {
 *   emit({ id: 1, name: 'John' });
 * };
 *
 * return (
 *   <div>
 *     <button onClick={handleLogin}>登录</button>
 *     <button onClick={reset}>清空所有监听器</button>
 *   </div>
 * );
 * ```
 */
declare const useEventBus: (eventName: string, options?: UseEventBusOptions) => UseEventBusReturn;

interface ElementSize {
    /** 元素宽度 */
    width: number;
    /** 元素高度 */
    height: number;
    /** 元素内容宽度 */
    contentWidth: number;
    /** 元素内容高度 */
    contentHeight: number;
    /** 元素边框宽度 */
    borderWidth: number;
    /** 元素边框高度 */
    borderHeight: number;
    /** 元素内边距宽度 */
    paddingWidth: number;
    /** 元素内边距高度 */
    paddingHeight: number;
}
interface UseElementSizeOptions {
    /** 是否启用尺寸监听 */
    enabled?: boolean;
    /** 是否包含边框 */
    includeBorder?: boolean;
    /** 是否包含内边距 */
    includePadding?: boolean;
    /** 尺寸变化时的回调 */
    onSizeChange?: (size: ElementSize) => void;
    /** 防抖延迟（毫秒） */
    debounceMs?: number;
}
interface UseElementSizeReturn<T extends HTMLElement = HTMLElement> {
    /** 要监听的元素引用 */
    ref: RefObject<T | null>;
    /** 元素尺寸信息 */
    size: ElementSize;
    /** 是否正在监听 */
    isObserving: boolean;
    /** 开始监听 */
    startObserving: () => void;
    /** 停止监听 */
    stopObserving: () => void;
    /** 手动更新尺寸 */
    updateSize: () => void;
}
/**
 * 元素尺寸监听 Hook
 * 用于获取和监听元素的尺寸变化
 *
 * @template T - 元素类型
 * @param options 配置选项
 * @returns 返回元素引用和尺寸信息
 *
 * @example
 * ```tsx
 * const { ref, size, isObserving, startObserving, stopObserving } = useElementSize({
 *   includeBorder: true,
 *   includePadding: true,
 *   onSizeChange: (size) => console.log('尺寸变化:', size),
 *   debounceMs: 100
 * });
 *
 * return (
 *   <div ref={ref} className="w-64 h-48 border p-4">
 *     <p>宽度: {size.width}px</p>
 *     <p>高度: {size.height}px</p>
 *     <button onClick={startObserving}>开始监听</button>
 *     <button onClick={stopObserving}>停止监听</button>
 *   </div>
 * );
 * ```
 */
declare const useElementSize: <T extends HTMLElement = HTMLElement>(options?: UseElementSizeOptions) => UseElementSizeReturn<T>;

interface UseClipboardOptions {
    /** 是否显示成功提示 */
    showSuccess?: boolean;
    /** 成功提示消息 */
    successMessage?: string;
    /** 错误提示消息 */
    errorMessage?: string;
    /** 成功提示回调 */
    onSuccess?: (text: string) => void;
    /** 错误提示回调 */
    onError?: (error: Error) => void;
    /** 复制超时时间（毫秒） */
    timeout?: number;
}
interface UseClipboardReturn {
    /** 复制文本到剪贴板 */
    copyToClipboard: (text: string, options?: UseClipboardOptions) => Promise<void>;
    /** 从剪贴板读取文本 */
    readFromClipboard: () => Promise<string>;
    /** 是否正在复制 */
    isCopying: boolean;
    /** 是否已复制 */
    isCopied: boolean;
    /** 复制的文本 */
    copiedText: string | null;
    /** 错误信息 */
    error: Error | null;
    /** 是否支持剪贴板 API */
    canUseClipboardApi: boolean;
    /** 重置状态 */
    reset: () => void;
}
/**
 * 剪贴板功能 Hook
 * 提供复制和读取剪贴板的功能
 *
 * @param options 配置选项
 * @returns 返回剪贴板操作相关的方法和状态
 *
 * @example
 * ```tsx
 * const { copyToClipboard, readFromClipboard, isCopied, error } = useClipboard({
 *   showSuccess: true,
 *   successMessage: '复制成功！',
 *   onSuccess: (text) => console.log('复制成功:', text)
 * });
 *
 * const handleCopy = async () => {
 *   await copyToClipboard('要复制的文本');
 * };
 *
 * const handleRead = async () => {
 *   const text = await readFromClipboard();
 *   console.log('剪贴板内容:', text);
 * };
 *
 * return (
 *   <div>
 *     <button onClick={handleCopy} disabled={isCopying}>
 *       {isCopying ? '复制中...' : '复制文本'}
 *     </button>
 *     <button onClick={handleRead}>读取剪贴板</button>
 *     {isCopied && <p>已复制: {copiedText}</p>}
 *     {error && <p>错误: {error.message}</p>}
 *   </div>
 * );
 * ```
 */
declare const useClipboard: (options?: UseClipboardOptions) => UseClipboardReturn;

interface UseHoverOptions {
    /** 鼠标进入时的回调 */
    onEnter?: () => void;
    /** 鼠标离开时的回调 */
    onLeave?: () => void;
    /** 是否启用悬浮监听 */
    enabled?: boolean;
    /** 延迟进入时间（毫秒） */
    delayEnter?: number;
    /** 延迟离开时间（毫秒） */
    delayLeave?: number;
}
interface UseHoverReturn<T extends HTMLElement = HTMLElement> {
    /** 要监听的元素引用 */
    ref: RefObject<T | null>;
    /** 是否正在悬浮 */
    isHovered: boolean;
    /** 手动设置悬浮状态 */
    setHovered: (hovered: boolean) => void;
}
/**
 * 鼠标悬浮监听 Hook
 * 用于监听 DOM 元素的鼠标悬浮状态
 *
 * @template T - 元素类型
 * @param options 配置选项
 * @returns 返回元素引用和悬浮状态
 *
 * @example
 * ```tsx
 * const { ref, isHovered, setHovered } = useHover({
 *   onEnter: () => console.log('鼠标进入'),
 *   onLeave: () => console.log('鼠标离开'),
 *   delayEnter: 100,
 *   delayLeave: 200
 * });
 *
 * return (
 *   <div
 *     ref={ref}
 *     className={`p-4 border rounded ${isHovered ? 'bg-blue-100' : 'bg-white'}`}
 *   >
 *     {isHovered ? '鼠标悬浮中' : '鼠标未悬浮'}
 *   </div>
 * );
 * ```
 */
declare const useHover: <T extends HTMLElement = HTMLElement>(options?: UseHoverOptions) => UseHoverReturn<T>;

interface UseScrollingOptions {
    /** 滚动开始时的回调 */
    onScrollStart?: () => void;
    /** 滚动结束时的回调 */
    onScrollEnd?: () => void;
    /** 滚动时的回调 */
    onScroll?: (event: Event) => void;
    /** 是否启用滚动监听 */
    enabled?: boolean;
    /** 滚动结束的延迟时间（毫秒） */
    scrollEndDelay?: number;
    /** 是否监听水平滚动 */
    horizontal?: boolean;
    /** 是否监听垂直滚动 */
    vertical?: boolean;
}
interface UseScrollingReturn<T extends HTMLElement = HTMLElement> {
    /** 要监听的元素引用 */
    ref: RefObject<T | null>;
    /** 是否正在滚动 */
    isScrolling: boolean;
    /** 滚动方向 */
    scrollDirection: 'horizontal' | 'vertical' | 'both' | null;
    /** 滚动位置信息 */
    scrollPosition: {
        scrollTop: number;
        scrollLeft: number;
        scrollWidth: number;
        scrollHeight: number;
        clientWidth: number;
        clientHeight: number;
    };
    /** 手动设置滚动状态 */
    setScrolling: (scrolling: boolean) => void;
}
/**
 * 滚动监听 Hook
 * 用于监听 DOM 元素的滚动状态
 *
 * @template T - 元素类型
 * @param options 配置选项
 * @returns 返回元素引用和滚动状态
 *
 * @example
 * ```tsx
 * const { ref, isScrolling, scrollDirection, scrollPosition } = useScrolling({
 *   onScrollStart: () => console.log('开始滚动'),
 *   onScrollEnd: () => console.log('结束滚动'),
 *   scrollEndDelay: 150,
 *   horizontal: true,
 *   vertical: true
 * });
 *
 * return (
 *   <div
 *     ref={ref}
 *     className={`p-4 border rounded ${isScrolling ? 'bg-blue-100' : 'bg-white'}`}
 *     style={{ height: '200px', overflow: 'auto' }}
 *   >
 *     {isScrolling ? '正在滚动' : '未滚动'}
 *   </div>
 * );
 * ```
 */
declare const useScrolling: <T extends HTMLElement = HTMLElement>(options?: UseScrollingOptions) => UseScrollingReturn<T>;

declare const useUpdateEffect: (effect: React.EffectCallback, deps?: React.DependencyList) => void;

interface WatermarkOptions {
    /** 水印文本 */
    text?: string;
    /** 水印图片 URL */
    image?: string;
    /** 水印字体大小 */
    fontSize?: number;
    /** 水印字体颜色 */
    color?: string;
    /** 水印透明度 */
    opacity?: number;
    /** 水印旋转角度 */
    rotate?: number;
    /** 水印间距 */
    gap?: [number, number];
    /** 水印偏移量 */
    offset?: [number, number];
    /** 水印层级 */
    zIndex?: number;
    /** 水印字体 */
    fontFamily?: string;
    /** 水印字体粗细 */
    fontWeight?: string;
    /** 水印宽度 */
    width?: number;
    /** 水印高度 */
    height?: number;
    /** 是否启用水印 */
    enabled?: boolean;
}
interface UseWatermarkReturn {
    /** 要添加水印的元素引用 */
    ref: React.RefObject<HTMLElement | null>;
    /** 设置水印选项 */
    setOptions: (options: Partial<WatermarkOptions>) => void;
    /** 清除水印 */
    clear: () => void;
    /** 当前水印选项 */
    options: WatermarkOptions;
}
/**
 * 水印 Hook
 * 用于给 DOM 元素添加水印
 *
 * @param options 水印配置选项
 * @returns 返回元素引用和水印控制方法
 *
 * @example
 * ```tsx
 * const { ref, setOptions, clear } = useWatermark({
 *   text: '机密文件',
 *   fontSize: 16,
 *   color: '#999',
 *   opacity: 0.3,
 *   rotate: -15
 * });
 *
 * return (
 *   <div ref={ref} className="p-4 border">
 *     <h1>重要文档</h1>
 *     <p>这是需要添加水印的内容...</p>
 *   </div>
 * );
 * ```
 */
declare const useWatermark: (options?: WatermarkOptions) => UseWatermarkReturn;

interface ButtonProps {
    children: React$1.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
}
declare const Button: React$1.FC<ButtonProps>;

export { Button, useClickAway, useClipboard, useCounter, useDebounce, useElementSize, useEventBus, useFullscreen, useHover, useInView, useLocalStorage, useMouse, usePolling, usePrevious, useQueue, useScrolling, useThrottle, useTimeAgo, useToggle, useUpdateEffect, useWatermark, useWindowSize };
