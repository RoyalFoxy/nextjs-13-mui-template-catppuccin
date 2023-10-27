import { Typography } from "@mui/material";
import { ReactNode } from "react";

interface P {
  children?: ReactNode;
}

export default function P({ children }: P) {
  return (
    <Typography
      variant="body1"
      component="p"
      sx={{
        margin: "0.75rem 0",
      }}>
      {children}
    </Typography>
  );
}
