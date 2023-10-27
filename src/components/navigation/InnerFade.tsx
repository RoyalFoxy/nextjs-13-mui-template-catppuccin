"use client";

import { ReactNode, useEffect } from "react";
import { Box, Fade as MuiFade, useTheme } from "@mui/material";

import { usePathname, useRouter } from "next/navigation";
import { useContext } from "./Fade";

interface InnerFade {
  children: ReactNode | ReactNode[];
}

export default function InnerFade({ children }: InnerFade) {
  const ctx = useContext();
  const theme = useTheme();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    ctx.isExiting = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  useEffect(() => {
    if (ctx.isExiting || ctx.visible) return;

    const timeout = setTimeout(
      () => (ctx.visible = true),
      theme.transitions.duration.enteringScreen
    );
    return () => clearTimeout(timeout);
  }, [theme.transitions.duration.enteringScreen, ctx]);

  return (
    <MuiFade
      in={ctx.visible}
      onTransitionEnd={() => {
        if (ctx.isExiting) router.push(ctx.nextHref);
      }}>
      <Box>{children}</Box>
    </MuiFade>
  );
}
