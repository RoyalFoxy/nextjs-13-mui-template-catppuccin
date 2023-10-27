"use client";

import { Link as MuiLink, LinkProps, Box, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { useContext } from "./Fade";
import { useRouter } from "next/navigation";
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";

interface Link {
  href?: string;
  children?: ReactNode;
}

export default function Link({ children, href = "" }: Link) {
  const ctx = useContext();
  const router = useRouter();
  const theme = useTheme();

  const linkProps: LinkProps = {};

  const newTab = /^https?:\/\/.*$/gm.test(href);

  if (newTab) {
    linkProps.target = "_blank";
    linkProps.rel = "noopener noreferrer";
  }

  return (
    <MuiLink
      {...linkProps}
      sx={{ transition: `text-decoration-color ${theme.transitions.duration.standard}ms ease` }}
      href={href}
      onMouseEnter={() => router.prefetch(href, { kind: PrefetchKind.FULL })}
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
