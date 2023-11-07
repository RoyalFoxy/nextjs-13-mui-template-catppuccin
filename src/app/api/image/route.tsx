import { latte, mocha } from "@/components/theme/palette";
import { readFileSync } from "fs";

import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { join } from "path";

const SCALER = 2;

const monocraftPath = join(
  process.cwd(),
  "public",
  "assets",
  "fonts",
  "Monocraft.otf"
);

const monocraft = readFileSync(monocraftPath);

export async function GET(req: NextRequest) {
  const mode =
    req.nextUrl.searchParams.get("mode") ||
    req.headers.get("sec-ch-prefers-color-scheme") ||
    "light";

  const palette = mode === "dark" ? mocha : latte;

  // const monocraft = await (
  //   await fetch(
  //     `${req.nextUrl.protocol}//${req.nextUrl.host}/assets/fonts/Monocraft.otf`
  //   )
  // ).arrayBuffer();

  return new ImageResponse(
    (
      <div
        style={{
          background: "#00000000",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
        }}>
        <p
          style={{
            margin: "auto",
            textAlign: "center",
            fontSize: `${2 * SCALER}rem`,
            color: palette.text,
            fontFamily: "Monocraft",
          }}>
          royalfoxy.xyz
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img
            style={{ height: "35%", marginLeft: `${0.4 * SCALER}rem` }}
            src={`${req.nextUrl.protocol}//${req.nextUrl.host}/icon/android-chrome-512x512.png`}
          />
        </p>
      </div>
    ),
    {
      width: 350 * SCALER,
      height: 150 * SCALER,
      fonts: [
        {
          name: "Monocraft",
          data: monocraft,
        },
      ],
    }
  );
}
