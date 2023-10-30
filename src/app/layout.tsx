import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { FadeContext } from "@/components/navigation/FadeContext";
import GlobalContext from "@/globalContext";
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
        <GlobalContext>
          <ThemeRegistry options={{ key: "mui", prepend: true }}>
            <FadeContext>
              <LayoutView>{children}</LayoutView>
            </FadeContext>
          </ThemeRegistry>
        </GlobalContext>
      </body>
    </html>
  );
}
