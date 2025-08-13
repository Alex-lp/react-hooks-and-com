export interface UseQueueOptions<T> {
    /** 初始队列元素 */
    initialItems?: T[];
    /** 队列最大长度 */
    maxSize?: number;
    /** 队列满时的处理策略 */
    overflowStrategy?: 'drop' | 'error' | 'shift';
}
export interface UseQueueReturn<T> {
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
export declare const useQueue: <T>(options?: UseQueueOptions<T>) => UseQueueReturn<T>;
//# sourceMappingURL=useQueue.d.ts.map