"use client";

import { useEffect, useState } from "react";

import { Box } from "@mui/material";

interface ClientImage {
  name: string;
  blurred: string;
  alt: string;
}

export default function ClientImage({ name, blurred, alt }: ClientImage) {
  const [base64Src, setBase64Src] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncWrapper = async () => {
      const response = await fetch(`/images/${name}.png`);
      const imageArrayBuffer = await response.arrayBuffer();
      const imageBuffer = Buffer.from(imageArrayBuffer);
      const base64 = imageBuffer.toString("base64");

      setBase64Src(`data:image/png;base64,${base64}`);
      setLoading(false);
    };

    asyncWrapper();
  }, [name]);

  return (
    <Box sx={{ padding: 0.5, position: "relative", display: "inline-flex" }}>
      <style jsx>{`
        @keyframes fade {
          0%: {
            opacity: 1;
          }
          99%: {
            opacity: 1;
          }
          100%: {
            opacity: 0;
          }
        }
      `}</style>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/${blurred}.webp`}
        alt={alt}
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "6px",
          animation: loading ? "" : "fade 1s",
          MozAnimation: loading ? "" : "fade 1s",
          WebkitAnimation: loading ? "" : "fade 1s",
          opacity: loading ? 1 : 0,
          boxShadow: "var(--template-shadows-2)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={base64Src}
        alt={alt}
        style={{
          position: "relative",
          transform: "translate(-100%, 0)",
          width: "100%",
          borderRadius: "6px",
          opacity: loading ? 0 : 1,
          transition: "opacity 1s ease-in-out",
          MozTransition: "opacity 1s ease-in-out",
          WebkitTransition: "opacity 1s ease-in-out",
          boxShadow: "var(--template-shadows-2)",
        }}
      />
    </Box>
  );
}
