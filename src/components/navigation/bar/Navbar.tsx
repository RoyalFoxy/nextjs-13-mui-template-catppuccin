"use client";

import { AppBar, Box, Toolbar, useTheme } from "@mui/material";

import Back from "./Back";
import H from "@content/H";
import MenuButton from "./MenuButton";
import { useGlobalContext } from "@/globalContext";

export default function Navbar() {
  const ctx = useGlobalContext();
  return (
    <AppBar
      sx={{
        position: "fixed",
        background: "var(--transparent-crust)",
        boxShadow: "var(--template-shadows-4)",
        backdropFilter: "blur(var(--blur))",
        WebkitBackdropFilter: "blur(var(--blur))",
        padding: "1rem var(--margin)",
      }}>
      <Toolbar sx={{ display: "flex", flexDirection: "row" }}>
        <MenuButton />
        <Box sx={{ marginLeft: 1 }}>
          <Back />
        </Box>
        <Box sx={{ marginLeft: "auto" }}>
          <H
            extraSmall
            noTopMargin
            isSpan>
            {ctx.pageName}
          </H>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
