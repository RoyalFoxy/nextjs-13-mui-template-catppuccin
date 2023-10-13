"use client";

import { Link as MuiLink, LinkProps } from "@mui/material";
import { ReactNode } from "react";
import { useContext } from "./Fade";

interface Link {
  href: string;
  children: ReactNode;
}

export default function Link({ children, href }: Link) {
  const ctx = useContext();

  const linkProps: LinkProps = {};

  const newTab = /^https?:\/\/.*$/gm.test(href);

  if (newTab) {
    linkProps.target = "_blank";
    linkProps.rel = "noopener noreferrer";
  }

  return (
    <MuiLink
      {...linkProps}
      href={href}
      onClick={(event) => {
        if (newTab) return;
        event.preventDefault();
        ctx.nextHref = href;

        ctx.isExiting = true;
        ctx.visible = false;
      }}>
      {children}
    </MuiLink>
  );
}
