"use client";

import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import For from "@components/For";
import Link from "@navigation/Link";
import MenuIcon from "@mui/icons-material/Menu";

export default function Home() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const links = [
    {
      display: "Home",
      href: "/",
    },
  ];

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size="large"
        edge="start"
        color="primary">
        {open ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <For dataSet={links}>
          {({ href, display }) => (
            <Link
              href={href}
              key={href}
              noPreview>
              <MenuItem
                onClick={handleClose}
                sx={{
                  margin: 1,
                  marginTop: 0,
                  marginBottom: 0,
                  borderRadius: 1,
                }}>
                {display}
              </MenuItem>
            </Link>
          )}
        </For>
      </Menu>
    </Box>
  );
}
