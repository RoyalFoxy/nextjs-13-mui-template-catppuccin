import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { FadeContext } from "@navigation/FadeContext";
import GlobalContext from "@/globalContext";
import { KeyboardContext } from "@components/keyboard/KeyboardContext";
import LayoutView from "@components/LayoutView";
import { ReactElement } from "react";
import ThemeRegistry from "@theme/ThemeRegistry";
import prefersDarkMode from "@/utils/prefersDarkMode";
import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    images: ["/api/image"],
  },
};

interface Layout {
  children: ReactElement;
}

export default function Layout({ children }: Layout) {
  return (
    <html lang="en">
      <body>
        <GlobalContext>
          <ThemeRegistry
            options={{ key: "mui", prepend: true }}
            serverDarkMode={prefersDarkMode()}>
            <FadeContext>
              <KeyboardContext>
                <LayoutView>{children}</LayoutView>
              </KeyboardContext>
            </FadeContext>
          </ThemeRegistry>
        </GlobalContext>
      </body>
    </html>
  );
}
