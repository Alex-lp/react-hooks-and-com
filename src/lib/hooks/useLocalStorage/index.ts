import { useCallback, useState } from 'react';

export interface Serializer<T> {
  stringify: (value: T) => string;
  parse: (value: string) => T;
}

export interface UseLocalStorageOptions<T = unknown> {
  serializer?: Serializer<T>;
  onError?: (error: Error) => void;
}

export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  removeValue: () => void;
  isStored: boolean;
}

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
): UseLocalStorageReturn<T> => {
  const { 
    serializer = { 
      stringify: JSON.stringify as unknown as Serializer<T>['stringify'], 
      parse: JSON.parse as unknown as Serializer<T>['parse'] 
    },
    onError = (error) => console.error('useLocalStorage error:', error)
  } = options;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      
      const item = window.localStorage.getItem(key);
      return item ? serializer.parse(item) : initialValue;
    } catch (error) {
      onError(error as Error);
      return initialValue;
    }
  });

  const [isStored, setIsStored] = useState(() => {
    try {
      if (typeof window === 'undefined') {
        return false;
      }
      return window.localStorage.getItem(key) !== null;
    } catch {
      return false;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      setIsStored(true);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, serializer.stringify(valueToStore));
      }
    } catch (error) {
      onError(error as Error);
    }
  }, [key, storedValue, serializer, onError]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      setIsStored(false);
      
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      onError(error as Error);
    }
  }, [key, initialValue, onError]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    isStored,
  };
}; 