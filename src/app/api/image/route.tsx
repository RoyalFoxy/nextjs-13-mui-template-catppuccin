import { latte, mocha } from "@/components/theme/palette";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

const SCALER = 5;

export async function GET(req: NextRequest) {
  const mode = req.headers.get("sec-ch-prefers-color-scheme") || "light";

  const palette = mode === "dark" ? mocha : latte;

  const monocraft = await (
    await fetch(
      `${req.nextUrl.protocol}//${req.nextUrl.host}/assets/fonts/Monocraft.otf`
    )
  ).arrayBuffer();

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
            fontSize: "10rem",
            color: palette.text,
            fontFamily: "Monocraft",
          }}>
          royalfoxy.xyz
          <img
            style={{ height: "35%", marginLeft: "2rem" }}
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
