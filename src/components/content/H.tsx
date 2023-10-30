import { Typography, TypographyProps } from "@mui/material";

import { ReactNode } from "react";

interface H {
  children?: ReactNode;
  large?: boolean;
  small?: boolean;
  extraSmall?: boolean;
  noTopMargin?: boolean;
  isSpan?: boolean;
  /** Is set into `var(--template-palette-YOUR_COLOR)` */
  color?: string;
  underline?: boolean;
}

export default function H({
  children,
  large,
  small,
  extraSmall,
  noTopMargin,
  isSpan,
  color,
  underline,
}: H) {
  let tag: "h1" | "h2" | "h3" | "h5" = "h2";

  if (large) tag = "h1";
  if (small) tag = "h3";
  if (extraSmall) tag = "h5";

  const sx: TypographyProps["sx"] = { marginTop: "1.5rem" };

  if (
    color &&
    ["error", "primary", "info", "secondary", "success", "warning"].includes(
      color
    )
  )
    color = `${color}-main`;
  if (color) sx.color = `var(--template-palette-${color}) !important`;
  if (underline) sx.textDecoration = "underline";

  if (noTopMargin) delete sx.marginTop;

  return (
    <Typography
      component={isSpan ? "span" : tag}
      classes={`${isSpan ? tag : ""}`}
      variant={tag}
      sx={sx}>
      {children}
    </Typography>
  );
}
