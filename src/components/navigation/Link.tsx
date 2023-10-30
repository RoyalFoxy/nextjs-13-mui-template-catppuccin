"use client";

import { LinkProps, Link as MuiLink, useTheme } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
import { ReactNode } from "react";
import { useContext } from "./Fade";
import { useSnackbar } from "notistack";

interface Link {
  href?: string;
  children?: ReactNode;
}

export default function Link({ children, href = "" }: Link) {
  const ctx = useContext();
  const router = useRouter();
  const theme = useTheme();
  const pathname = usePathname();
  const { enqueueSnackbar } = useSnackbar();

  const linkProps: LinkProps = {};

  const newTab = /^https?:\/\/.*$/gm.test(href);

  if (newTab) {
    linkProps.target = "_blank";
    linkProps.rel = "noopener noreferrer";
  }

  console.log();

  return (
    <MuiLink
      {...linkProps}
      sx={{
        transition: `text-decoration-color ${theme.transitions.duration.standard}ms ease`,
      }}
      href={href}
      onMouseEnter={() => router.prefetch(href, { kind: PrefetchKind.FULL })}
      onClick={(event) => {
        if (newTab) return;
        event.preventDefault();

        const regex = new RegExp(
          `^${href.split("?")[0].replaceAll("/", "\\/")}(\\?.*)?$`
        );
        if (regex.test(pathname)) {
          enqueueSnackbar("Clicking this link does nothing.", {
            variant: "info",
          });
          return;
        }

        ctx.nextHref = href;

        ctx.isExiting = true;
        ctx.visible = false;
      }}>
      {children}
    </MuiLink>
  );
}
