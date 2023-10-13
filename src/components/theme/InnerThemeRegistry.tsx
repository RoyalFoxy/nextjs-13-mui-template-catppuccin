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
    scheme.setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  return <>{children}</>;
}
