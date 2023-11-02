import { useCallback, useState } from "react";

import nookies from "nookies";

/**
 * ! Getting a cookie is NOT reactive
 */
export default function useCookies(): [
  <T>(name: string) => T | null,
  <T>(name: string, value: T | unknown, options?: any) => void
] {
  const [getCookies, setCookies] = useState(nookies.get(null));

  const get = useCallback(
    <T>(name: string, defaultValue: T | null = null) => {
      if (!getCookies[name]) return defaultValue;
      return JSON.parse(getCookies[name]) as T;
    },
    [getCookies]
  );

  const set = useCallback(
    <T>(name: string, value: T | unknown, options: any = {}) => {
      nookies.set(null, name, JSON.stringify(value), options);
      setCookies(nookies.get(null));
    },
    []
  );

  return [get, set];
}
