import { useCallback, useEffect, useState } from "react";

// Get the value of a certain key in the local storage
const getLocalStorageValue = (key: string, initValue: string) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? item : initValue;
  }
  return initValue;
};

// Set the value of a certain key in the local storage
export const useLocalStorage = <T>(key: string, initValue: T) => {
  const [value, setValue] = useState<T>(initValue);
  useEffect(() => {
    setValue(JSON.parse(getLocalStorageValue(key, JSON.stringify(initValue))));
  }, []);

  useEffect(() => {
    const callback = (event: StorageEvent) => {
      if (event.key === key) {
        setValue((value: T) =>
          JSON.parse(localStorage.getItem(key) ?? JSON.stringify(value))
        );
      }
    };

    window.addEventListener("storage", callback);
    return () => {
      window.removeEventListener("storage", callback);
    };
  }, [key]);

  const setLocalStorageValue = useCallback(
    (setStateAction: T | ((prevState: T) => T)) => {
      const newValue: T =
        setStateAction instanceof Function
          ? setStateAction(value)
          : setStateAction;

      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    },
    [key, value]
  );

  return [value, setLocalStorageValue] as const;
};
