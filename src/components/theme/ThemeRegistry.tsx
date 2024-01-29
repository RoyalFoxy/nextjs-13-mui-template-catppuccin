"use client";

import { ReactElement } from "react";
import { Options } from "@emotion/cache";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material";
import InnerThemeRegistry from "@theme/InnerThemeRegistry";
import theme from "@theme/Theme";

interface ThemeRegistry {
  serverDarkMode: boolean;
  options: Options;
  children: ReactElement;
}

export default function ThemeRegistry({
  serverDarkMode,
  options: { key, prepend },
  children,
}: ThemeRegistry) {
  return (
    <>
      <AppRouterCacheProvider options={{ key, prepend }}>
        <CssVarsProvider
          theme={theme}
          defaultMode={serverDarkMode ? "dark" : "light"}>
          <CssBaseline />
          <InnerThemeRegistry serverDarkMode={serverDarkMode}>
            {children}
          </InnerThemeRegistry>
        </CssVarsProvider>
      </AppRouterCacheProvider>
    </>
  );
}
