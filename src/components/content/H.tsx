import { Typography, TypographyProps } from "@mui/material";

import { ReactNode } from "react";

interface H {
  children?: ReactNode;
  large?: boolean;
  small?: boolean;
  /** Is set into `var(--template-palette-YOUR_COLOR)` */
  color?: string;
  underline?: boolean;
}

export default function H({ children, large, small, color, underline }: H) {
  let tag: "h1" | "h2" | "h3" = "h2";

  if (large) tag = "h1";
  if (small) tag = "h3";

  const sx: TypographyProps["sx"] = { marginTop: "1.5rem" };

  if (
    color &&
    ["error", "primary", "info", "secondary", "success", "warning"].includes(
      color,
    )
  )
    color = `${color}-main`;
  if (color) sx.color = `var(--template-palette-${color}) !important`;
  if (underline) sx.textDecoration = "underline";

  return (
    <Typography variant={tag} sx={sx}>
      {children}
    </Typography>
  );
}
