"use client";

import {
  Box,
  Card,
  Fade,
  LinkProps,
  Link as MuiLink,
  Popover,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
import { ReactNode, useEffect, useState } from "react";
import { useFadeContext } from "./FadeContext";
import { useSnackbar } from "notistack";
import { Preview } from "@/app/api/preview/route";
import { transparency } from "../theme/Theme";

interface Link {
  href?: string;
  children?: ReactNode;
  noPreview?: boolean;
}

const PREVIEW_WIDTH = 350;
const IMAGE_WIDTH = PREVIEW_WIDTH;
const IMAGE_HEIGHT = 150;

export default function Link({ children, href = "", noPreview }: Link) {
  const [showPreview, setShowPreview] = useState(false);
  const [loadingState, setLoadingState] = useState<"loading" | "loaded" | null>(
    null
  );
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null);
  const [previewState, setPreviewState] = useState<Preview | null>(null);

  const [hovering, setHovering] = useState({ link: false, preview: false });

  const ctx = useFadeContext();
  const router = useRouter();
  const theme = useTheme();
  const pathname = usePathname();
  const { enqueueSnackbar } = useSnackbar();

  const {
    complex,
    shorter,
    shortest,
    standard,
  } = theme.transitions.duration;

  const linkProps: LinkProps = {};

  const newTab = /^https?:\/\/.*$/gm.test(href);

  if (newTab) {
    linkProps.target = "_blank";
    linkProps.rel = "noopener noreferrer";
  }

  useEffect(() => {
    const shouldShowLoading = hovering.link || hovering.preview;
    const shouldShow = shouldShowLoading && !!previewState;

    let timeout1 = setTimeout(
      () => setShowPreview(shouldShow),
      shouldShow ? complex : shorter
    );

    let loadingState: "loading" | "loaded" | null = null;
    if (hovering.link && !previewState) loadingState = "loading";
    else if (hovering.link) loadingState = "loaded";

    let timeout2: any = null;

    if (loadingState) {
      timeout2 = setTimeout(
        () => {
          setLoadingState(loadingState);
        },
        loadingState === "loading" ? shortest : complex
      );
    } else setLoadingState(loadingState);

    setCurrentTimeout(timeout1);

    return () => {
      clearTimeout(timeout1);
      if (timeout2) clearTimeout(timeout2);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovering, previewState]);

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
        onKeyDown={(e) => console.log(e)}
        onMouseEnter={(e) => {
          if (!newTab) router.prefetch(href, { kind: PrefetchKind.FULL });
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
              .catch((e) => {
                console.log(e);
              });

          setHovering((hovering) => ({ ...hovering, link: true }));
        }}
        onMouseLeave={() => {
          if (noPreview) return;

          if (currentTimeout) {
            clearTimeout(currentTimeout);
            setCurrentTimeout(null);
          }

          setHovering((hovering) => ({ ...hovering, link: false }));
        }}
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

          setShowPreview(false)

          ctx.nextHref = href;

          ctx.isExiting = true;
          ctx.visible = false;
        }}>
        <style jsx>{`
          @keyframes loading-animation {
            0% {
              background: #00000000;
            }
            50% {
              background: ${theme.palette.catppuccin.overlay0}${transparency};
            }
            100% {
              background: #00000000;
            }
          }
        `}</style>
        <span
          style={{
            background:
              loadingState === "loaded"
                ? `${theme.palette.catppuccin.overlay0}${transparency}`
                : "#00000000",
            transition: `background ${standard}ms`,
            animation:
              loadingState === "loading"
                ? `loading-animation ${complex * 2}ms ease-in-out infinite`
                : "",
            padding: "0.25rem",
            margin: "-0.25rem",
            borderRadius: theme.shape.borderRadius,
            backgroundClip: "content-box",
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
