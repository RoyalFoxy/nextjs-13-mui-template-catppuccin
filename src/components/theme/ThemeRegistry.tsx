"use client";

import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import createCache, { Options } from "@emotion/cache";
import theme from "./Theme";
import { useServerInsertedHTML } from "next/navigation";
import { ReactElement, useState } from "react";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material";
import InnerThemeRegistry from "./InnerThemeRegistry";

interface ThemeRegistry {
  options: Options;
  children: ReactElement;
}

export default function ThemeRegistry({
  options: { key, prepend },
  children,
}: ThemeRegistry) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key, prepend });
    cache.compat = true;

    const prevInsert = cache.insert;
    let inserted: string[] = [];

    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };

    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;

    let styles = "";
    for (const name of names) styles += cache.inserted[name];

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: prepend ? `@layer emotion {${styles}}` : styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <InnerThemeRegistry>{children}</InnerThemeRegistry>
      </CssVarsProvider>
    </CacheProvider>
  );
}
