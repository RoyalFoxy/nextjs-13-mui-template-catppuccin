import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ReactElement } from "react";
import ThemeRegistry from "@/components/theme/ThemeRegistry";
import { Fade } from "@/components/navigation/Fade";

interface Layout {
  children: ReactElement;
}

export default function Layout({ children }: Layout) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui", prepend: true }}>
          <Fade>{children}</Fade>
        </ThemeRegistry>
      </body>
    </html>
  );
}
