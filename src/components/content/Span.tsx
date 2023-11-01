import { Typography, TypographyProps } from "@mui/material";

import { ReactNode } from "react";

interface Span {
  children?: ReactNode;
  /** Is set into `var(--template-palette-YOUR_COLOR)` */
  color?: string;
  bold?: boolean;
  underline?: boolean;
}

export default function Span({ children, color, bold, underline }: Span) {
  const sx: TypographyProps["sx"] = { color: "inherit" };

  if (
    color &&
    ["error", "primary", "info", "secondary", "success", "warning"].includes(
      color
    )
  )
    color = `${color}-main`;
  if (color) sx.color = `var(--template-palette-${color})`;
  if (underline) sx.textDecoration = "underline";
  if (bold) sx.fontWeight = "bold";

  return (
    <Typography
      variant="body1"
      component="span"
      sx={sx}>
      {children}
    </Typography>
  );
}
