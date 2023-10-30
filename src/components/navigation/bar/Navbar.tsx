"use client";

import { AppBar, Box, Toolbar } from "@mui/material";

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
        boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
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
