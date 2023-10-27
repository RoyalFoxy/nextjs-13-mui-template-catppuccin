import { Typography } from "@mui/material";
import { ReactNode } from "react";

interface H {
  children?: ReactNode;
  large?: boolean;
  small?: boolean;
}

export default function H({ children, large, small }: H) {
  let variant: "h2" | "h3" | "h4" = "h3";
  let tag: "h1" | "h2" | "h3" = "h2";

  if (large) {
    variant = "h2";
    tag = "h1";
  }
  if (small) {
    variant = "h4";
    tag = "h3";
  }

  return (
    <Typography
      variant={variant}
      component={tag}
      sx={{
        marginTop: "1.5rem",
      }}>
      {children}
    </Typography>
  );
}
