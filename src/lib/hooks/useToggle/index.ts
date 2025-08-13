import { useCallback, useState } from 'react';

export interface UseToggleOptions<T = boolean> {
  initialValue?: T;
  trueValue?: T;
  falseValue?: T;
}

export interface UseToggleReturn<T> {
  value: T;
  toggle: () => void;
  setValue: (value: T) => void;
  setTrue: () => void;
  setFalse: () => void;
}

export const useToggle = <T = boolean>(
  options: UseToggleOptions<T> = {}
): UseToggleReturn<T> => {
  const {
    initialValue = false as T,
    trueValue = true as T,
    falseValue = false as T,
  } = options;

  const [value, setValue] = useState<T>(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => prev === trueValue ? falseValue : trueValue);
  }, [trueValue, falseValue]);

  const setTrue = useCallback(() => {
    setValue(trueValue);
  }, [trueValue]);

  const setFalse = useCallback(() => {
    setValue(falseValue);
  }, [falseValue]);

  return {
    value,
    toggle,
    setValue,
    setTrue,
    setFalse,
  };
}; 