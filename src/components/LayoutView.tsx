"use client";

import { Box, useTheme } from "@mui/material";
import { ReactElement, forwardRef } from "react";

import Navbar from "@navigation/bar/Navbar";
import { SnackbarProvider } from "notistack";
import Toast from "./toasts/Toast";
import { transparency } from "./theme/Theme";
import InformationToasts from "./toasts/InformationToasts";

interface LayoutView {
  children: ReactElement;
}

export default function LayoutView({ children }: LayoutView) {
  const theme = useTheme();
  const selectionColor = `${theme.palette.primary.main}${transparency}`;

  return (
    <SnackbarProvider
      maxSnack={3}
      Components={{
        info: forwardRef(Toast),
        default: forwardRef(Toast),
        error: forwardRef(Toast),
        success: forwardRef(Toast),
        warning: forwardRef(Toast),
      }}
      autoHideDuration={5000}
      preventDuplicate
      transitionDuration={theme.transitions.duration.standard}>
      <Navbar />
      <InformationToasts />
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "7rem" }}>
        <Box sx={{ width: "calc(100vw - var(--margin) * 2)" }}>{children}</Box>
      </Box>
      <style
        global
        jsx>{`
        *::selection {
          background: ${selectionColor};
        }
      `}</style>
    </SnackbarProvider>
  );
}
