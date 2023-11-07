import { latte, mocha } from "@theme/palette";

import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { join } from "path";
import { readFile } from "fs/promises";

const SCALER = 2;

const iconPath = join(
  process.cwd(),
  "public",
  "icon",
  "android-chrome-192x192.png"
);

const monocraftPath = join(
  process.cwd(),
  "public",
  "assets",
  "fonts",
  "Monocraft.otf"
);

const monocraftPromise = readFile(monocraftPath);
const iconPromise = readFile(iconPath).then(
  (buffer) => `data:image/png;base64,${buffer.toString("base64")}`
);

export async function GET(req: NextRequest) {
  const mode =
    req.nextUrl.searchParams.get("mode") ||
    req.headers.get("sec-ch-prefers-color-scheme") ||
    "light";

  const palette = mode === "dark" ? mocha : latte;

  const [monocraft, icon] = await Promise.all([monocraftPromise, iconPromise]);

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
            src={icon}
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
