import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value: unknown, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState('');
  const timerRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    timerRef.current = setTimeout(
      () => setDebouncedValue(value as string),
      delay,
    );

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};
