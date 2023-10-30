"use client";

import { LinkProps, Link as MuiLink, useTheme } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
import { ReactNode } from "react";
import { useFadeContext } from "./FadeContext";
import { useSnackbar } from "notistack";

interface Link {
  href?: string;
  children?: ReactNode;
}

export default function Link({ children, href = "" }: Link) {
  const ctx = useFadeContext();
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

  return (
    <MuiLink
      {...linkProps}
      sx={{
        "transition": `text-decoration-color ${theme.transitions.duration.standard}ms ease`,
        "&:hover svg": {
          color: "var(--template-palette-primary-main)",
        },
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
      {newTab && (
        <OpenInNewIcon
          sx={{
            marginLeft: "0.125rem",
            width: "1rem",
            height: "1rem",
            verticalAlign: "-7.5%",
            color: "var(--template-palette-primary-dark)",
            transition: `color ${theme.transitions.duration.standard}ms ease`,
          }}
        />
      )}
    </MuiLink>
  );
}
