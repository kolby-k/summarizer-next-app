"use client";

import { getItem, setItem } from "@/lib/storage";
import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const stored = getItem<T>(key);
    if (stored !== null) setValue(stored);
  }, [key]);

  useEffect(() => {
    setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
