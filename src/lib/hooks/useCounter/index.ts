import { useState, useCallback } from 'react';

export interface UseCounterOptions {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (value: number) => void;
  isMin: boolean;
  isMax: boolean;
}

export const useCounter = (options: UseCounterOptions = {}): UseCounterReturn => {
  const {
    initialValue = 0,
    min = -Infinity,
    max = Infinity,
    step = 1,
  } = options;

  const [count, setCountState] = useState(initialValue);

  const setCount = useCallback((value: number) => {
    const clampedValue = Math.min(Math.max(value, min), max);
    setCountState(clampedValue);
  }, [min, max]);

  const increment = useCallback(() => {
    setCount(count + step);
  }, [count, step, setCount]);

  const decrement = useCallback(() => {
    setCount(count - step);
  }, [count, step, setCount]);

  const reset = useCallback(() => {
    setCountState(initialValue);
  }, [initialValue]);

  const isMin = count <= min;
  const isMax = count >= max;

  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
    isMin,
    isMax,
  };
}; 