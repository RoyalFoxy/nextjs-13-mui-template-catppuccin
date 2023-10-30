import { Alert, useTheme } from "@mui/material";
import { CSSProperties, ForwardedRef, useMemo } from "react";

import interpolateColor from "@/utils/interpolateColor";
import { transparency } from "./theme/Theme";
import { useSnackbar } from "notistack";

interface Toast {
  id: number;
  variant: "success" | "info" | "warning" | "error";
  message: string;
  persist: boolean;
  style: CSSProperties;
}

export default function Toast(
  { id, message, persist, variant, style }: Toast,
  ref: ForwardedRef<any>
) {
  const { closeSnackbar } = useSnackbar();
  const theme = useTheme();

  const color = useMemo(() => {
    return interpolateColor(
      theme.palette.catppuccin.crust,
      theme.palette[variant][theme.palette.mode]
    );
  }, [theme, variant]);

  return (
    <Alert
      key={id}
      color={variant}
      ref={ref}
      style={style}
      severity={variant}
      sx={{ background: `${color}${transparency}`, boxShadow: "var(--template-shadows-4)" }}
      onClose={() => closeSnackbar(id)}>
      {message}
    </Alert>
  );
}
