import {
  experimental_extendTheme as extendTheme,
} from "@mui/material";
import { name } from "@/../package.json";

const mocha = {
  rosewater: "#f5e0dc",
  flamingo: "#f2cdcd",
  pink: "#f5c2e7",
  mauve: "#cba6f7",
  red: "#f38ba8",
  maroon: "#eba0ac",
  peach: "#fab387",
  yellow: "#f9e2af",
  green: "#a6e3a1",
  teal: "#94e2d5",
  sky: "#89dceb",
  sapphire: "#74c7ec",
  blue: "#89b4fa",
  lavender: "#b4befe",
  text: "#cdd6f4",
  subtext1: "#bac2de",
  subtext0: "#a6adc8",
  overlay2: "#9399b2",
  overlay1: "#7f849c",
  overlay0: "#6c7086",
  surface2: "#585b70",
  surface1: "#45475a",
  surface0: "#313244",
  base: "#1e1e2e",
  mantle: "#181825",
  crust: "#11111b",
};

const latte = {
  rosewater: "#dc8a78",
  flamingo: "#dd7878",
  pink: "#ea76cb",
  mauve: "#8839ef",
  red: "#d20f39",
  maroon: "#e64553",
  peach: "#fe640b",
  yellow: "#df8e1d",
  green: "#40a02b",
  teal: "#179299",
  sky: "#04a5e5",
  sapphire: "#209fb5",
  blue: "#1e66f5",
  lavender: "#7287fd",
  text: "#4c4f69",
  subtext1: "#5c5f77",
  subtext0: "#6c6f85",
  overlay2: "#7c7f93",
  overlay1: "#8c8fa1",
  overlay0: "#9ca0b0",
  surface2: "#acb0be",
  surface1: "#bcc0cc",
  surface0: "#ccd0da",
  base: "#eff1f5",
  mantle: "#e6e9ef",
  crust: "#dce0e8",
};

const transparency = "4c";

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
  components: {
    MuiMenu: { styleOverrides: { paper: { backgroundImage: "none" } } },
    MuiCard: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          background: transparent(theme.vars.palette.catppuccin.crust),
          backdropFilter: "blur(var(--blur))",
          WebkitBackdropFilter: "blur(var(--blur))",
        }),
      },
    },
  },
  cssVarPrefix: name,
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
