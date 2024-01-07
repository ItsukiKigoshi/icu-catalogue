import { useCallback, useEffect, useState } from "react";
import { Course } from "../type/Types";

// Get the value of a certain key in the local storage
const getLocalStorageValue = (key: string, initValue: string) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? item : initValue;
  }
  return initValue;
};

// Set the value of a certain key in the local storage
export const useLocalStorage = (key: string, initValue: Course[]) => {
  const [value, setValue] = useState<Course[]>([]);
  useEffect(() => {
    setValue(JSON.parse(getLocalStorageValue(key, JSON.stringify(initValue))));
  }, []);

  useEffect(() => {
    const callback = (event: StorageEvent) => {
      if (event.key === key) {
        setValue((value: Course[]) =>
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
    (setStateAction: Course[] | ((prevState: Course[]) => Course[])) => {
      const newValue: Course[] =
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
