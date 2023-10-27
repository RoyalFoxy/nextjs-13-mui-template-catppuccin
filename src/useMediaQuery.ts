import { useEffect, useState } from "react";

export default function useMediaQuery(
  query: string,
  defaultValue: boolean = false,
) {
  const [mediaQuery, setMediaQuery] = useState(
    isServer() ? null : window.matchMedia(query),
  );
  const [matches, setMatches] = useState(
    mediaQuery ? mediaQuery.matches : defaultValue,
  );

  useEffect(() => {
    if (isServer()) return;
    if (!mediaQuery) return setMediaQuery(window.matchMedia(query));
    mediaQuery.onchange = ({ matches }) => setMatches(matches);
  }, [mediaQuery, query]);

  return matches;
}

function isServer() {
  return typeof document === "undefined";
}
