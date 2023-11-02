import { latte, mocha } from "@/components/theme/palette";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

const SCALER = 5;

export async function GET(req: NextRequest) {
  const mode = req.headers.get("sec-ch-prefers-color-scheme") || "light";

  const palette = mode === "dark" ? mocha : latte;

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
            fontSize: "5rem",
            color: palette.text
          }}>
          RoyalFoxy
        </p>
      </div>
    ),
    { width: 350 * SCALER, height: 150 * SCALER }
  );
}
