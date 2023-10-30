"use client";

import { ReactElement, useEffect } from "react";

import { useColorScheme } from "@mui/material";
import useMediaQuery from "@/utils/useMediaQuery";
import Mocha from "@components/HLJS/themes/Mocha";
import Latte from "@components/HLJS/themes/Mocha";

interface InnerThemeRegistry {
  children: ReactElement;
}

export default function InnerThemeRegistry({ children }: InnerThemeRegistry) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const scheme = useColorScheme();
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
