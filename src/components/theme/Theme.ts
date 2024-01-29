import {
  Catppuccin,
  TransparentColors,
  latte,
  latteTheme,
  mocha,
  mochaTheme,
  transparentLatte,
  transparentMocha,
} from "@theme/palette";

import data from "@package";
import { experimental_extendTheme as extendTheme } from "@mui/material";

const heading = () => ({
  color: "var(--template-palette-primary-main)",
  fontFamily: "Monocraft",
});

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        catppuccin: mocha,
        transparent: transparentMocha,
        ...mochaTheme,
        common: { white: mocha.text, black: mocha.crust },
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
        transparent: transparentLatte,
        ...latteTheme,
        common: { white: latte.text, black: latte.crust },
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
          background: theme.vars.palette.transparent.catppuccin.mantle,
          backdropFilter: "blur(var(--blur))",
        }),
      },
    },
  },
  cssVarPrefix: data.name,
});

declare module "@mui/material/styles" {
  interface PaletteOptions {
    catppuccin: Catppuccin;
    transparent: TransparentColors;
  }
  interface Palette {
    catppuccin: Catppuccin;
    transparent: TransparentColors;
  }
}

export default theme;
