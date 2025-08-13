import { useCallback, useEffect, useState } from 'react';

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

// 中文时间单位映射
const CHINESE_UNITS: Record<TimeUnit, string> = {
  second: '秒',
  minute: '分钟',
  hour: '小时',
  day: '天',
  week: '周',
  month: '个月',
  year: '年'
};

// 英文时间单位映射
const ENGLISH_UNITS: Record<TimeUnit, string> = {
  second: 'second',
  minute: 'minute',
  hour: 'hour',
  day: 'day',
  week: 'week',
  month: 'month',
  year: 'year'
};

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
export const useTimeAgo = (
  timestamp: string | number | Date,
  options: UseTimeAgoOptions = {}
): UseTimeAgoReturn => {
  const {
    interval = 60000,
    locale = 'zh',
    relative = true,
    minUnit = 'minute',
    autoUpdate = true
  } = options;

  const [timeAgo, setTimeAgo] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState(false);

  const calculateTimeAgo = useCallback(() => {
    const now = Date.now();
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const diffInMs = now - date.getTime();

    // 转换为秒、分钟、小时等
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    // 自定义格式化函数
    const formatCustom = (value: number, unit: TimeUnit): string => {
      const units = locale === 'zh' ? CHINESE_UNITS : ENGLISH_UNITS;
      
      // 中文特殊处理
      if (locale === 'zh') {
        if (unit === 'second' && value === 0) return '刚刚';
        if (unit === 'second') return `${value}秒前`;
        if (unit === 'minute') return `${value}分钟前`;
        if (unit === 'hour') return `${value}小时前`;
        if (unit === 'day') return `${value}天前`;
        if (unit === 'week') return `${value}周前`;
        if (unit === 'month') return `${value}个月前`;
        if (unit === 'year') return `${value}年前`;
      }
      
      // 英文处理
      if (locale === 'en') {
        if (value === 1) return `1 ${units[unit]} ago`;
        return `${value} ${units[unit]}s ago`;
      }
      
      return `${value} ${units[unit]}${locale === 'zh' ? '前' : 's ago'}`;
    };

    // 使用 Intl.RelativeTimeFormat 格式化
    const formatWithIntl = (value: number, unit: TimeUnit): string => {
      try {
        const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
        return rtf.format(-value, unit);
      } catch (e) {
        return formatCustom(value, unit);
      }
    };

    // 根据最小单位限制
    if (minUnit === 'year' || (diffInYears > 0 && minUnit !== 'second')) {
      return relative 
        ? formatWithIntl(diffInYears, 'year')
        : formatCustom(diffInYears, 'year');
    } else if (minUnit === 'month' || (diffInMonths > 0 && minUnit !== 'second' && minUnit !== 'minute')) {
      return relative 
        ? formatWithIntl(diffInMonths, 'month')
        : formatCustom(diffInMonths, 'month');
    } else if (minUnit === 'week' || (diffInWeeks > 0 && minUnit !== 'second' && minUnit !== 'minute' && minUnit !== 'hour')) {
      return relative 
        ? formatWithIntl(diffInWeeks, 'week')
        : formatCustom(diffInWeeks, 'week');
    } else if (minUnit === 'day' || (diffInDays > 0 && minUnit !== 'second' && minUnit !== 'minute')) {
      return relative 
        ? formatWithIntl(diffInDays, 'day')
        : formatCustom(diffInDays, 'day');
    } else if (minUnit === 'hour' || (diffInHours > 0 && minUnit !== 'second')) {
      return relative 
        ? formatWithIntl(diffInHours, 'hour')
        : formatCustom(diffInHours, 'hour');
    } else if (minUnit === 'minute' || diffInMinutes > 0) {
      return relative 
        ? formatWithIntl(diffInMinutes, 'minute')
        : formatCustom(diffInMinutes, 'minute');
    } else {
      return relative 
        ? formatWithIntl(diffInSeconds, 'second')
        : formatCustom(diffInSeconds, 'second');
    }
  }, [timestamp, locale, relative, minUnit]);

  // 初始计算时间
  useEffect(() => {
    setTimeAgo(calculateTimeAgo());
  }, [calculateTimeAgo]);

  // 设置定时器定期更新
  useEffect(() => {
    if (!autoUpdate) return;

    const intervalId = setInterval(() => {
      setIsUpdating(true);
      setTimeAgo(calculateTimeAgo());
      setIsUpdating(false);
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval, calculateTimeAgo, autoUpdate]);

  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const diffInMs = Date.now() - date.getTime();

  return {
    timeAgo,
    timestamp: date,
    diffInMs,
    isUpdating
  };
};
