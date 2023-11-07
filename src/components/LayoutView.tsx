"use client";

import { ReactElement, forwardRef } from "react";

import { Box } from "@mui/material";
import InformationToasts from "./toasts/InformationToasts";
import Navbar from "@navigation/bar/Navbar";
import { SnackbarProvider } from "notistack";
import Toast from "@components/toasts/Toast";
import { transparent } from "./theme/palette";
import useTheme from "@useTheme";

interface LayoutView {
  children: ReactElement;
}

export default function LayoutView({ children }: LayoutView) {
  const theme = useTheme();
  const selectionColor = transparent(theme.vars.palette.primary.main);

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

        @keyframes loading-animation {
          0% {
            background-color: ${theme.vars.palette.transparent.catppuccin
              .overlay0};
          }
          50% {
            background-color: #00000000;
          }
          100% {
            background-color: ${theme.vars.palette.transparent.catppuccin
              .overlay0};
          }
        }

        @keyframes no-preview-blink {
          0% {
            color: ${theme.vars.palette.primary.main};
          }
          25% {
            color: ${theme.vars.palette.error.main};
          }
          50% {
            color: ${theme.vars.palette.primary.main};
          }
          75% {
            color: ${theme.vars.palette.error.main};
          }
          100% {
            color: ${theme.vars.palette.primary.main};
          }
        }
      `}</style>
    </SnackbarProvider>
  );
}
