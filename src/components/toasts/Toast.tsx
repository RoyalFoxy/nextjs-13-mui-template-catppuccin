import { CSSProperties, ForwardedRef, ReactNode, useMemo } from "react";

import { Alert } from "@mui/material";
import IsMobile from "../../utils/userAgent/isMobile";
import KeyNames from "../keyboard/useKeyName";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";
import KeyboardOptionKeyIcon from "@mui/icons-material/KeyboardOptionKey";
import interpolateColor from "@/utils/interpolateColor";
import { transparent } from "../theme/palette";
import { useSnackbar } from "notistack";
import useTheme from "@useTheme";

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

const icons: Record<string, ReactNode> = {
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

  const backgroundColor = useMemo(() => {
    return transparent(
      interpolateColor(
        theme.palette.catppuccin.crust,
        theme.palette[variant as "success" | "info" | "warning" | "error"][
          theme.palette.mode
        ]
      )
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
        background: backgroundColor,
        boxShadow: theme.vars.shadows[4],
      }}
      onClose={() => closeSnackbar(id)}>
      {content}
    </Alert>
  );
}
