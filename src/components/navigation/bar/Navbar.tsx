"use client";

import { AppBar, Box, Toolbar, useTheme } from "@mui/material";

import Back from "@navigation/bar/Back";
import H from "@content/H";
import MenuButton from "@navigation/bar/MenuButton";
import { useGlobalContext } from "@/globalContext";

export default function Navbar() {
  const globalCtx = useGlobalContext();
  const theme = useTheme();
  return (
    <AppBar
      sx={{
        position: "fixed",
        background: theme.palette.catppuccin.crustTransparent,
        boxShadow: theme.shadows[4],
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
            {globalCtx.pageName}
          </H>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
