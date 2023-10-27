import { AppBar, Box, Toolbar } from "@mui/material";

import Back from "./Back";
import MenuButton from "./MenuButton";

export default function Navbar() {
  return (
    <AppBar
      sx={{
        position: "fixed",
        background: "var(--transparent-crust)",
        boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(var(--blur))",
        WebkitBackdropFilter: "blur(var(--blur))",
        padding: "1rem var(--margin)",
      }}
    >
      <Toolbar sx={{ display: "flex", flexDirection: "row" }}>
        <MenuButton />
        <Box sx={{ marginLeft: 1 }}>
          <Back />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
