import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Fade } from "@navigation/Fade";
import LayoutView from "@components/LayoutView";
import { ReactElement } from "react";
import ThemeRegistry from "@theme/ThemeRegistry";

interface Layout {
  children: ReactElement;
}

export default function Layout({ children }: Layout) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui", prepend: true }}>
          <Fade>
            <LayoutView>{children}</LayoutView>
          </Fade>
        </ThemeRegistry>
      </body>
    </html>
  );
}
