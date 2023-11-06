import { latte, mocha } from "./palette";

import data from "@/../package.json";
import { experimental_extendTheme as extendTheme } from "@mui/material";

export const transparency = "4c";

const heading = () => ({
  color: "var(--template-palette-primary-main)",
  fontFamily: "Monocraft",
});

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        catppuccin: mocha,
        background: {
          default: mocha.base,
          paper: mocha.mantle,
        },
        common: {
          white: mocha.text,
          black: mocha.crust,
        },
        error: {
          main: mocha.red,
        },
        primary: {
          main: mocha.yellow,
        },
        info: {
          main: mocha.sky,
        },
        secondary: {
          main: mocha.mauve,
        },
        success: {
          main: mocha.green,
        },
        warning: {
          main: mocha.peach,
        },
        text: {
          primary: mocha.text,
          secondary: mocha.subtext1,
          disabled: mocha.subtext0,
        },
        divider: mocha.surface0,
      },
    },
    light: {
      palette: {
        catppuccin: latte,
        background: {
          default: latte.base,
          paper: latte.mantle,
        },
        common: {
          white: latte.text,
          black: latte.crust,
        },
        error: {
          main: latte.red,
        },
        primary: {
          main: latte.yellow,
        },
        info: {
          main: latte.sky,
        },
        secondary: {
          main: latte.mauve,
        },
        success: {
          main: latte.green,
        },
        warning: {
          main: latte.peach,
        },
        text: {
          primary: latte.text,
          secondary: latte.subtext1,
          disabled: latte.subtext0,
        },
        divider: latte.surface0,
      },
    },
  },
  typography: {
    allVariants: {
      textAlign: "center",
    },
    h1: heading(),
    h2: heading(),
    h3: heading(),
    h4: heading(),
    h5: heading(),
    h6: heading(),
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiMenu: { styleOverrides: { paper: { backgroundImage: "none" } } },
    MuiCard: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: transparent(theme.vars.palette.catppuccin.crust),
          backdropFilter: "blur(var(--blur))",
        }),
      },
    },
  },
  cssVarPrefix: data.name,
});

function transparent(color: string) {
  return `${color}${transparency}`;
}

declare module "@mui/material/styles" {
  interface PaletteOptions {
    catppuccin: {
      rosewater: string;
      flamingo: string;
      pink: string;
      mauve: string;
      red: string;
      maroon: string;
      peach: string;
      yellow: string;
      green: string;
      teal: string;
      sky: string;
      sapphire: string;
      blue: string;
      lavender: string;
      text: string;
      subtext1: string;
      subtext0: string;
      overlay2: string;
      overlay1: string;
      overlay0: string;
      surface2: string;
      surface1: string;
      surface0: string;
      base: string;
      mantle: string;
      crust: string;
    };
  }
  interface Palette {
    catppuccin: {
      rosewater: string;
      flamingo: string;
      pink: string;
      mauve: string;
      red: string;
      maroon: string;
      peach: string;
      yellow: string;
      green: string;
      teal: string;
      sky: string;
      sapphire: string;
      blue: string;
      lavender: string;
      text: string;
      subtext1: string;
      subtext0: string;
      overlay2: string;
      overlay1: string;
      overlay0: string;
      surface2: string;
      surface1: string;
      surface0: string;
      base: string;
      mantle: string;
      crust: string;
    };
  }
}

export default theme;
