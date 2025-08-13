import { useState, useCallback, useMemo } from 'react';
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
export const useQueue = (options = {}) => {
    const { initialItems = [], maxSize, overflowStrategy = 'drop' } = options;
    const [queue, setQueue] = useState(initialItems);
    // 入队 - 添加元素到队列末尾
    const enqueue = useCallback((item) => {
        setQueue(prevQueue => {
            if (maxSize && prevQueue.length >= maxSize) {
                switch (overflowStrategy) {
                    case 'error':
                        throw new Error('Queue is full');
                    case 'shift':
                        return [...prevQueue.slice(1), item];
                    case 'drop':
                    default:
                        return prevQueue;
                }
            }
            return [...prevQueue, item];
        });
    }, [maxSize, overflowStrategy]);
    // 批量入队 - 添加多个元素到队列末尾
    const enqueueMany = useCallback((items) => {
        setQueue(prevQueue => {
            if (!maxSize) {
                return [...prevQueue, ...items];
            }
            const availableSpace = maxSize - prevQueue.length;
            if (availableSpace <= 0) {
                switch (overflowStrategy) {
                    case 'error':
                        throw new Error('Queue is full');
                    case 'shift':
                        const itemsToAdd = items.slice(-maxSize);
                        return [...prevQueue.slice(items.length), ...itemsToAdd];
                    case 'drop':
                    default:
                        return prevQueue;
                }
            }
            const itemsToAdd = items.slice(0, availableSpace);
            return [...prevQueue, ...itemsToAdd];
        });
    }, [maxSize, overflowStrategy]);
    // 出队 - 移除并返回队列的第一个元素
    const dequeue = useCallback(() => {
        let dequeuedItem;
        setQueue(prevQueue => {
            if (prevQueue.length === 0)
                return prevQueue;
            dequeuedItem = prevQueue[0];
            return prevQueue.slice(1);
        });
        return dequeuedItem;
    }, []);
    // 查看队列的第一个元素（不移除）
    const peek = useCallback(() => {
        return queue[0];
    }, [queue]);
    // 查看队列的最后一个元素
    const peekLast = useCallback(() => {
        return queue[queue.length - 1];
    }, [queue]);
    // 清空队列
    const clear = useCallback(() => {
        setQueue([]);
    }, []);
    // 检查队列是否为空
    const isEmpty = useCallback(() => {
        return queue.length === 0;
    }, [queue]);
    // 获取队列长度
    const size = useCallback(() => {
        return queue.length;
    }, [queue]);
    // 检查队列是否已满
    const isFull = useCallback(() => {
        return maxSize ? queue.length >= maxSize : false;
    }, [queue, maxSize]);
    // 使用 useMemo 优化队列的字符串表示
    const queueString = useMemo(() => {
        return JSON.stringify(queue);
    }, [queue]);
    return {
        queue,
        enqueue,
        enqueueMany,
        dequeue,
        peek,
        peekLast,
        clear,
        isEmpty,
        size,
        isFull,
        queueString,
        full: isFull(),
        length: queue.length
    };
};
//# sourceMappingURL=useQueue.js.map