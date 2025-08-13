import { useEffect, useState } from 'react';

export interface UseDebounceOptions {
  delay?: number;
  immediate?: boolean;
}

export interface UseDebounceReturn<T> {
  value: T;
  setValue: (value: T) => void;
  debouncedValue: T;
  isPending: boolean;
}

export const useDebounce = <T>(
  initialValue: T,
  options: UseDebounceOptions = {}
): UseDebounceReturn<T> => {
  const { delay = 500, immediate = false } = options;
  
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (immediate) {
      setDebouncedValue(value);
      setIsPending(false);
      return;
    }

    setIsPending(true);
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsPending(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, immediate]);

  return {
    value,
    setValue,
    debouncedValue,
    isPending,
  };
}; 