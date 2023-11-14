import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import DebugTheme from "@/components/DebugTheme";
import { FadeContext } from "@navigation/FadeContext";
import GlobalContext from "@/globalContext";
import { KeyboardContext } from "@components/keyboard/KeyboardContext";
import LayoutView from "@components/LayoutView";
import { Metadata } from "next";
import { ReactElement } from "react";
import ThemeRegistry from "@theme/ThemeRegistry";
import prefersDarkMode from "@/utils/prefersDarkMode";

export async function generateMetadata() {
  const darkMode = prefersDarkMode();

  const metadata: Metadata = {
    openGraph: {
      images: [`/api/image?mode=${darkMode ? "dark" : "light"}`],
    },
  };

  return metadata;
}

interface Layout {
  children: ReactElement;
}

export default function Layout({ children }: Layout) {
  return (
    <html lang="en">
      <head>
        <link
          rel="manifest"
          href="/manifest.json"
        />
        <link
          rel="apple-touch-icon"
          href="/manifest/96.png"
        />
        <meta
          name="apple-mobile-web-app-status-bar"
          content="#000000"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icon/favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="/icon/site.webmanifest"
        />
        <link
          rel="mask-icon"
          href="/icon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link
          rel="android-chrome"
          href="/icon/android-chrome-192x192.png"
        />
        <meta
          name="msapplication-TileColor"
          content="#da532c"
        />
        <meta
          content="width=device-width,initial-scale=1.0"
          name="viewport"
        />
      </head>
      <body>
        <GlobalContext>
          <ThemeRegistry
            options={{ key: "mui", prepend: true }}
            serverDarkMode={prefersDarkMode()}>
            <FadeContext>
              <KeyboardContext>
                <LayoutView>{children}</LayoutView>
                {/* <DebugTheme /> */}
              </KeyboardContext>
            </FadeContext>
          </ThemeRegistry>
        </GlobalContext>
      </body>
    </html>
  );
}
