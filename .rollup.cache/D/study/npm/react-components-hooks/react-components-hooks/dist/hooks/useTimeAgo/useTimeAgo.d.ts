export type TimeUnit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
export type Locale = 'zh' | 'en';
export interface UseTimeAgoOptions {
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
export interface UseTimeAgoReturn {
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
export declare const useTimeAgo: (timestamp: string | number | Date, options?: UseTimeAgoOptions) => UseTimeAgoReturn;
//# sourceMappingURL=useTimeAgo.d.ts.map