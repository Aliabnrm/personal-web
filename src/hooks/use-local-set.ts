"use client";
import { useCallback, useSyncExternalStore } from "react";
const CHANGE_EVENT = "notebook-storage";
const empty = "[]";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}
export function useLocalSet(key: string) {
  const read = useCallback(() => {
    try {
      return localStorage.getItem(key) || empty;
    } catch {
      return empty;
    }
  }, [key]);
  const raw = useSyncExternalStore(subscribe, read, () => empty);
  let items: string[] = [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed))
      items = parsed.filter((x): x is string => typeof x === "string");
  } catch {
    /* Ignore damaged local data. */
  }
  const toggle = (id: string) => {
    try {
      const current: unknown = JSON.parse(read());
      const values: string[] = Array.isArray(current)
        ? current.filter((x): x is string => typeof x === "string")
        : [];
      localStorage.setItem(
        key,
        JSON.stringify(
          values.includes(id)
            ? values.filter((x) => x !== id)
            : [...values, id],
        ),
      );
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      return false;
    }
    return true;
  };
  return { items, toggle };
}
