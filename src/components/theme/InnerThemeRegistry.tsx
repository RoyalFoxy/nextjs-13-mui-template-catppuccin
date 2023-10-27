"use client";

import useMediaQuery from "@/useMediaQuery";
import { useColorScheme } from "@mui/material";
import { ReactElement, useEffect } from "react";

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

  return <>{children}</>;
}

function getPreferredMode(prefersDarkMode: boolean): "dark" | "light" {
  return prefersDarkMode ? "dark" : "light";
}
