"use client";

import { ReactElement, useEffect } from "react";

import Latte from "@components/HLJS/themes/Mocha";
import Mocha from "@components/HLJS/themes/Mocha";
import { useColorScheme } from "@mui/material";
import usePrefersDarkMode from "@utils/usePrefersDarkMode";

interface InnerThemeRegistry {
  serverDarkMode: boolean;
  children: ReactElement;
}

export default function InnerThemeRegistry({
  children,
  serverDarkMode,
}: InnerThemeRegistry) {
  const prefersDarkMode = usePrefersDarkMode(serverDarkMode);

  const scheme = useColorScheme();
  const mode = getPreferredMode(prefersDarkMode);

  useEffect(() => {
    const mode = getPreferredMode(prefersDarkMode);
    if (scheme.mode == mode) return;
    scheme.setMode(mode);
  }, [prefersDarkMode, scheme]);

  return (
    <>
      <Mocha active={prefersDarkMode} />
      <Latte active={!prefersDarkMode} />
      {children}
    </>
  );
}

function getPreferredMode(prefersDarkMode: boolean): "dark" | "light" {
  return prefersDarkMode ? "dark" : "light";
}
