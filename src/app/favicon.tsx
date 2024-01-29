import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { join } from "path";
import { readFile } from "fs/promises";

const iconPath = join(
  process.cwd(),
  "public",
  "icon",
  "android-chrome-192x192.png"
);

const iconPromise = readFile(iconPath).then(
  (buffer) => `data:image/png;base64,${buffer.toString("base64")}`
);

export async function GET(req: NextRequest) {
  const icon = await iconPromise;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#00000000",
          width: "100%",
          height: "100%",
          display: "flex",
        }}>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          style={{ height: "100%" }}
          src={icon}
        />
      </div>
    ),
    {
      width: 512,
      height: 512,
    }
  );
}
