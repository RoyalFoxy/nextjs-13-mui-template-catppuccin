import { Typography, TypographyProps } from "@mui/material";

import { ReactNode } from "react";

interface P {
  children?: ReactNode;
  /** Is set into `var(--template-palette-YOUR_COLOR)` */
  color?: string;
  bold?: boolean;
  underline?: boolean;
}

export default function P({ children, color, bold, underline }: P) {
  const sx: TypographyProps["sx"] = { marginTop: "1.5rem" };

  if (
    color &&
    ["error", "primary", "info", "secondary", "success", "warning"].includes(
      color
    )
  )
    color = `${color}-main`;
  if (color) sx.color = `var(--template-palette-${color})`;
  if (underline) sx.textDecoration = "underline";
  if (bold) sx.fontWeight = "bold"

  return (
    <Typography
      variant="body1"
      component="p"
      sx={sx}>
      {children}
    </Typography>
  );
}
