"use client";

import {
  Box,
  Card,
  LinkProps,
  Link as MuiLink,
  Popover,
  Typography,
} from "@mui/material";
import { MouseEvent, ReactNode, useCallback, useEffect, useState } from "react";
import { WEEK, fromToday } from "@time";
import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import IsMobile from "@utils/userAgent/isMobile";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
import { Preview } from "@/app/api/preview/route";
import useCookies from "@components/cookies/useCookies";
import { useFadeContext } from "@navigation/FadeContext";
import { useKeyPressed } from "@components/keyboard/KeyboardContext";
import { useSnackbar } from "notistack";
import useTheme from "@useTheme";

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
  const [openedContextMenu, setOpenedContextMenu] = useState(false);

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
    const canOpen = metaPressed || openedContextMenu;
    const isHoveringLink = hovering.link || openedContextMenu;
    const shouldShow = isHovering && !!previewState && canOpen;

    if (isHovering && canOpen && !!noPreview) {
      if (!getCookie<boolean>(noPreviewCookieName))
        enqueueSnackbar(
          `There is no preview for some links. This is indicated by ${
            IsMobile() ? "the red blinking animation." : "the error toast."
          }`,
          {
            variant: "warning",
            persist: true,
            onClose: () =>
              setCookie(noPreviewCookieName, true, {
                expires: fromToday(WEEK),
              }),
          }
        );
      if (IsMobile()) {
        enqueueSnackbar(`No preview available for this link.`, {
          variant: "error",
        });
        setOpenedContextMenu(false);
      }
      return;
    }

    let timeout1 = setTimeout(
      () => setShowPreview(shouldShow),
      shouldShow ? complex : shorter
    );

    let loadingState: "loading" | "loaded" | null = null;
    if (isHoveringLink && !previewState) loadingState = "loading";
    else if (isHoveringLink) loadingState = "loaded";

    if (!canOpen) loadingState = null;

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
    openedContextMenu,
  ]);

  const handleLinkEnter = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (!newTab) router.prefetch(href, { kind: PrefetchKind.FULL });
      setHovering((hovering) => ({ ...hovering, link: true }));
      if (noPreview) return;

      setAnchorEl(event.currentTarget);

      if (!previewState)
        fetch("/api/preview", {
          body: JSON.stringify({ preview: href }),
          method: "POST",
        })
          .then(async (response) => {
            const previewState: Preview = await response.json();
            setPreviewState(previewState);
          })
          .catch((error) => {
            console.error(error);
          });
    },
    [href, newTab, noPreview, previewState, router]
  );

  const handleLinkLeave = useCallback(() => {
    setHovering((hovering) => ({ ...hovering, link: false }));
    if (noPreview) return;

    if (currentTimeout) {
      clearTimeout(currentTimeout);
      setCurrentTimeout(null);
    }
  }, [currentTimeout, noPreview]);

  const handleLinkClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
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
    },
    [enqueueSnackbar, fadeCtx, href, newTab, pathname]
  );

  const handleContextMenu = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      if (!newTab) router.prefetch(href, { kind: PrefetchKind.FULL });
      setHovering((hovering) => ({ ...hovering, link: true }));
      setOpenedContextMenu(true);
      if (noPreview) return;

      function onUserInteract() {
        setOpenedContextMenu(false);
        document.removeEventListener("click", onUserInteract);
        document.removeEventListener("touchstart", onUserInteract);
      }

      document.addEventListener("click", onUserInteract);
      document.addEventListener("touchstart", onUserInteract);

      setAnchorEl(event.currentTarget);

      if (!previewState)
        fetch("/api/preview", {
          body: JSON.stringify({ preview: href }),
          method: "POST",
        })
          .then(async (response) => {
            const previewState: Preview = await response.json();
            setPreviewState(previewState);
          })
          .catch((error) => {
            console.error(error);
          });
    },
    [href, newTab, noPreview, previewState, router]
  );

  const transparent = `#00000000`;

  return (
    <>
      <MuiLink
        {...linkProps}
        sx={{
          "transition": `text-decoration-color ${standard}ms ease`,
          "&:hover span svg": {
            color: theme.vars.palette.primary.main,
          },
        }}
        href={href}
        onMouseEnter={handleLinkEnter}
        onMouseLeave={handleLinkLeave}
        onContextMenu={handleContextMenu}
        onClick={handleLinkClick}>
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
                  color: theme.vars.palette.primary[theme.vars.palette.mode],
                  transition: `color ${standard}ms ease`,
                }}
              />
            )}
          </span>
        ) : (
          <span
            style={{
              backgroundColor:
                loadingState === "loaded"
                  ? theme.vars.palette.transparent.catppuccin.overlay0
                  : transparent,
              transition: `background ${standard}ms`,
              animation:
                loadingState === "loading"
                  ? `loading-animation ${complex * 2}ms ease-in-out infinite`
                  : "",
              padding: "0.5rem",
              margin: "-0.5rem",
              borderRadius: theme.vars.shape.borderRadius,
            }}>
            {children}
            {newTab && (
              <OpenInNewIcon
                sx={{
                  width: "1rem",
                  height: "1rem",
                  verticalAlign: "-7.5%",
                  color: theme.vars.palette.primary[theme.vars.palette.mode],
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
            setHovering({ link: false, preview: false });
          }}
          disableRestoreFocus>
          <Card
            sx={{
              width: PREVIEW_WIDTH,
              pointerEvents: "all",
              background: theme.vars.palette.transparent.catppuccin.crust,
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
                    <Image
                      src={previewState?.image}
                      alt="Preview image"
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
