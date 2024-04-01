import { useEffect, useState } from "react";

const useDebounce = (value: any | undefined, time: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), time);
    return () => clearTimeout(handler);
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
