"use client";

import {
  Box,
  Card,
  LinkProps,
  Link as MuiLink,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { WEEK, fromToday } from "@/time";
import { useKeyPressed, useKeyboardContext } from "../keyboard/KeyboardContext";
import { usePathname, useRouter } from "next/navigation";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
import { Preview } from "@/app/api/preview/route";
import { transparency } from "../theme/Theme";
import useCookies from "../cookies/useCookies";
import { useFadeContext } from "./FadeContext";
import { useSnackbar } from "notistack";

interface Link {
  href?: string;
  children?: ReactNode;
  noPreview?: boolean;
}

type Timeout = NodeJS.Timeout;

export const PREVIEW_WIDTH = 350;
export const IMAGE_WIDTH = PREVIEW_WIDTH;
export const IMAGE_HEIGHT = 150;

export default function Link({ children, href = "", noPreview }: Link) {
  const [showPreview, setShowPreview] = useState(false);

  const [loadingState, setLoadingState] = useState<"loading" | "loaded" | null>(
    null
  );
  const [hovering, setHovering] = useState({ link: false, preview: false });

  const [previewState, setPreviewState] = useState<Preview | null>(null);

  const [currentTimeout, setCurrentTimeout] = useState<Timeout | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null);

  const fadeCtx = useFadeContext();
  const router = useRouter();
  const theme = useTheme();
  const pathname = usePathname();
  const { enqueueSnackbar } = useSnackbar();
  const metaPressed = useKeyPressed("MetaLeft");

  const { complex, shorter, standard } = theme.transitions.duration;

  const linkProps: LinkProps = {};

  const newTab = /^https?:\/\/.*$/gm.test(href);

  if (newTab) {
    linkProps.target = "_blank";
    linkProps.rel = "noopener noreferrer";
  }

  const [getCookie, setCookie] = useCookies();
  const noPreviewCookieName = "no-preview.warning";

  useEffect(() => {
    const isHovering = hovering.link || hovering.preview;
    const shouldShow = isHovering && !!previewState && metaPressed;

    if (
      isHovering &&
      metaPressed &&
      !!noPreview &&
      !getCookie<boolean>(noPreviewCookieName)
    ) {
      enqueueSnackbar(
        "There is no preview for some links. This is indicated by the red blinking animation.",
        {
          variant: "warning",
          persist: true,
          onClose: () =>
            setCookie(noPreviewCookieName, true, { expires: fromToday(WEEK) }),
        }
      );
      return;
    }

    let timeout1 = setTimeout(
      () => setShowPreview(shouldShow),
      shouldShow ? complex : shorter
    );

    let loadingState: "loading" | "loaded" | null = null;
    if (hovering.link && !previewState) loadingState = "loading";
    else if (hovering.link) loadingState = "loaded";

    if (!metaPressed) loadingState = null;

    let timeout2: any = null;

    if (loadingState) {
      timeout2 = setTimeout(
        () => setLoadingState(loadingState),
        loadingState === "loading" ? standard : complex
      );
    } else setLoadingState(loadingState);

    setCurrentTimeout(timeout1);

    return () => {
      clearTimeout(timeout1);
      if (timeout2) clearTimeout(timeout2);
    };
  }, [
    hovering,
    previewState,
    metaPressed,
    complex,
    standard,
    shorter,
    noPreview,
    enqueueSnackbar,
    getCookie,
    setCookie,
  ]);

  const overlay = `${theme.palette.catppuccin.overlay0}${transparency}`;
  const transparent = `#00000000`;

  return (
    <>
      <MuiLink
        {...linkProps}
        sx={{
          "transition": `text-decoration-color ${standard}ms ease`,
          "&:hover span svg": {
            color: "var(--template-palette-primary-main)",
          },
        }}
        href={href}
        onMouseEnter={(e) => {
          if (!newTab) router.prefetch(href, { kind: PrefetchKind.FULL });
          setHovering((hovering) => ({ ...hovering, link: true }));
          if (noPreview) return;

          setAnchorEl(e.currentTarget);

          if (!previewState)
            fetch("/api/preview", {
              body: JSON.stringify({ preview: href }),
              method: "POST",
            })
              .then(async (response) => {
                setPreviewState(await response.json());
              })
              .catch((error) => {
                console.error(error);
              });
        }}
        onMouseLeave={() => {
          setHovering((hovering) => ({ ...hovering, link: false }));
          if (noPreview) return;

          if (currentTimeout) {
            clearTimeout(currentTimeout);
            setCurrentTimeout(null);
          }
        }}
        onClick={(event) => {
          if (newTab) return;
          event.preventDefault();

          const regex = new RegExp(
            `^${href.split("?")[0].replaceAll("/", "\\/")}(\\?.*)?$`
          );
          if (regex.test(pathname)) {
            enqueueSnackbar("Clicking this link does nothing.");
            return;
          }

          setShowPreview(false);

          fadeCtx.nextHref = href;

          fadeCtx.isExiting = true;
          fadeCtx.visible = false;
        }}>
        <style jsx>{`
          @keyframes loading-animation {
            0% {
              background-color: ${transparent};
            }
            50% {
              background-color: ${overlay};
            }
            100% {
              background-color: ${transparent};
            }
          }

          @keyframes no-preview-blink {
            0% {
              color: var(--template-palette-primary-main);
            }
            25% {
              color: var(--template-palette-error-main);
            }
            50% {
              color: var(--template-palette-primary-main);
            }
            75% {
              color: var(--template-palette-error-main);
            }
            100% {
              color: var(--template-palette-primary-main);
            }
          }
        `}</style>
        {noPreview ? (
          <span
            style={{
              animation:
                hovering.link && metaPressed
                  ? `no-preview-blink ${complex * 1.5}ms ease-in-out`
                  : "",
            }}>
            {children}
            {newTab && (
              <OpenInNewIcon
                sx={{
                  width: "1rem",
                  height: "1rem",
                  verticalAlign: "-7.5%",
                  color: "var(--template-palette-primary-dark)",
                  transition: `color ${standard}ms ease`,
                }}
              />
            )}
          </span>
        ) : (
          <span
            style={{
              backgroundColor:
                loadingState === "loaded" ? overlay : transparent,
              transition: `background ${standard}ms`,
              animation:
                loadingState === "loading"
                  ? `loading-animation ${complex * 2}ms ease-in-out infinite`
                  : "",
              padding: "0.5rem",
              margin: "-0.5rem",
              borderRadius: theme.shape.borderRadius,
            }}>
            {children}
            {newTab && (
              <OpenInNewIcon
                sx={{
                  width: "1rem",
                  height: "1rem",
                  verticalAlign: "-7.5%",
                  color: "var(--template-palette-primary-dark)",
                  transition: `color ${standard}ms ease`,
                }}
              />
            )}
          </span>
        )}
      </MuiLink>
      {!noPreview && (
        <Popover
          open={showPreview}
          anchorEl={anchorEl}
          sx={{ pointerEvents: "none" }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={() => {
            setAnchorEl(null);
            setShowPreview(false);
            setHovering(() => ({ link: false, preview: false }));
          }}
          disableRestoreFocus>
          <Card
            sx={{
              width: PREVIEW_WIDTH,
              pointerEvents: "all",
              background: `${theme.palette.catppuccin.crust}${transparency}`,
            }}
            onMouseEnter={() => {
              setHovering((hovering) => ({ ...hovering, preview: true }));
            }}
            onMouseLeave={() => {
              if (currentTimeout) {
                clearTimeout(currentTimeout);
                setCurrentTimeout(null);
              }
              setHovering((hovering) => ({ ...hovering, preview: false }));
            }}>
            {previewState ? (
              <div style={{ width: PREVIEW_WIDTH }}>
                {previewState?.image && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewState?.image}
                      alt=""
                      width={IMAGE_WIDTH}
                      height={IMAGE_HEIGHT}
                      style={{ objectFit: "cover", display: "block" }}
                    />
                  </>
                )}
                <Box sx={{ padding: 2 }}>
                  {previewState?.title && (
                    <Typography
                      sx={{
                        textAlign: "justify",
                        fontWeight: "bold",
                        paddingBottom: 1,
                      }}>
                      {previewState?.title}
                    </Typography>
                  )}
                  {previewState?.description && (
                    <Typography
                      sx={{ textAlign: "justify", paddingBottom: 1 }}
                      variant="body2">
                      {previewState?.description}
                    </Typography>
                  )}
                  <Typography
                    sx={{
                      textAlign: "left",
                      fontWeight: "bold",
                      wordBreak: "break-all",
                    }}
                    variant="body2">
                    {previewState?.url}
                  </Typography>
                  {!(previewState?.title || previewState?.description) && (
                    <Typography
                      sx={{ textAlign: "left" }}
                      variant="body2">
                      No preview available
                    </Typography>
                  )}
                </Box>
              </div>
            ) : (
              <div />
            )}
          </Card>
        </Popover>
      )}
    </>
  );
}
