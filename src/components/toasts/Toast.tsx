import { Alert, useTheme } from "@mui/material";
import { CSSProperties, ForwardedRef, ReactNode, useMemo } from "react";
import KeyNames, { KeyValue } from "../keyboard/useKeyName";

import IsMobile from "../../utils/userAgent.ts/isMobile";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";
import KeyboardOptionKeyIcon from "@mui/icons-material/KeyboardOptionKey";
import interpolateColor from "@/utils/interpolateColor";
import { transparency } from "../theme/Theme";
import { useSnackbar } from "notistack";

interface Toast {
  id: number;
  variant: "success" | "info" | "warning" | "error" | "default";
  message: string;
  persist: boolean;
  style: CSSProperties;
}

const iconStyle = {
  width: "1rem",
  height: "1rem",
  verticalAlign: "-9%",
  alignSelf: "center",
};

const icons: { [key: string]: ReactNode } = {
  command: <KeyboardCommandKeyIcon sx={iconStyle} />,
  option: <KeyboardOptionKeyIcon sx={iconStyle} />,
};

export default function Toast(
  { id, message, persist, variant, style }: Toast,
  ref: ForwardedRef<any>
) {
  const { closeSnackbar } = useSnackbar();
  const theme = useTheme();

  if (variant === "default") variant = "info";

  const color = useMemo(() => {
    return interpolateColor(
      theme.palette.catppuccin.crust,
      theme.palette[variant as "success" | "info" | "warning" | "error"][
        theme.palette.mode
      ]
    );
  }, [theme, variant]);

  let content: any = null;

  const isMobile = IsMobile();
  const keyMap = KeyNames();

  if (!isMobile) {
    const entries = Object.entries(keyMap);
    content = message.split(" ").map((word) => {
      let replaced: any = "";
      entries.forEach(([key, value]) => {
        if (word === key) word = value as string;

        const icon = icons[word];

        if (icon) replaced = <span>{icon}&nbsp;</span>;
        else replaced = `${word} `;
      });

      return replaced;
    });
  } else content = message;

  return (
    <Alert
      key={id}
      color={variant}
      ref={ref}
      style={style}
      severity={variant}
      sx={{
        background: `${color}${transparency}`,
        boxShadow: "var(--template-shadows-4)",
      }}
      onClose={() => closeSnackbar(id)}>
      {content}
    </Alert>
  );
}
