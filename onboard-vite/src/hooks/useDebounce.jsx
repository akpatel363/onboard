import { useEffect, useState } from "react";

const useDebounce = (value, delay = 400) => {
  const [deferredValue, setDeferredValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDeferredValue(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return deferredValue;
};

export default useDebounce;
