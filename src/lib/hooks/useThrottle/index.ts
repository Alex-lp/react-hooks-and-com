import { useEffect, useState, useRef } from 'react';

export interface UseThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export interface UseThrottleReturn<T> {
  value: T;
  setValue: (value: T) => void;
  throttledValue: T;
  isThrottled: boolean;
}

export const useThrottle = <T>(
  initialValue: T,
  interval: number = 500,
  options: UseThrottleOptions = {}
): UseThrottleReturn<T> => {
  const { leading = true, trailing = true } = options;
  
  const [value, setValue] = useState<T>(initialValue);
  const [throttledValue, setThrottledValue] = useState<T>(initialValue);
  const [isThrottled, setIsThrottled] = useState(false);
  
  const lastUpdated = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const now = Date.now();
    
    // 如果是第一次调用且 leading 为 true，立即更新
    if (leading && lastUpdated.current === null) {
      lastUpdated.current = now;
      setThrottledValue(value);
      setIsThrottled(false);
      return;
    }

    // 如果距离上次更新时间已经超过间隔时间
    if (lastUpdated.current && now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
      setIsThrottled(false);
      
      // 清除之前的定时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else if (trailing) {
      // 设置定时器在间隔时间后更新值
      setIsThrottled(true);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        lastUpdated.current = Date.now();
        setThrottledValue(value);
        setIsThrottled(false);
        timeoutRef.current = null;
      }, interval - (now - (lastUpdated.current || 0)));
    }
  }, [value, interval, leading, trailing]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    value,
    setValue,
    throttledValue,
    isThrottled,
  };
}; 