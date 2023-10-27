import { CSSProperties, ForwardedRef } from "react";

import { Alert } from "@mui/material";
import { useSnackbar } from "notistack";

interface Toast {
  id: number;
  variant: "success" | "info" | "warning" | "error";
  message: string;
  persist: false;
  style: CSSProperties;
}

export default function Toast(
  { id, message, persist, variant, style }: Toast,
  ref: ForwardedRef<any>,
) {
  const { closeSnackbar } = useSnackbar();
  return (
    <Alert
      key={id}
      color={variant}
      ref={ref}
      style={style}
      onClose={() => closeSnackbar(id)}
    >
      {message}
    </Alert>
  );
}
