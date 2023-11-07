import { darken, lighten } from "@mui/material";
import { latteColors, mochaColors } from "./colors";

const colorMap: {
  background: { default: ColorKey; paper: ColorKey };
  error: { main: ColorKey };
  primary: { main: ColorKey };
  info: { main: ColorKey };
  secondary: { main: ColorKey };
  success: { main: ColorKey };
  warning: { main: ColorKey };
} = {
  background: { default: "base", paper: "mantle" },
  error: { main: "red" },
  primary: { main: "yellow" },
  info: { main: "sky" },
  secondary: { main: "mauve" },
  success: { main: "green" },
  warning: { main: "peach" },
};

export const transparency = "4c";

export const [mocha, mochaTheme, transparentMocha] = create(mochaColors);
export const [latte, latteTheme, transparentLatte] = create(latteColors);

function create(
  colors: typeof mochaColors
): [Catppuccin, Theme, TransparentColors] {
  const palette = {} as Catppuccin;
  const theme = {} as Theme;
  const transparentTheme = {} as TransparentColors;

  Object.entries(colors).forEach(([_key, value]) => {
    const key = _key as keyof typeof colors;
    palette[key] = value;
    if (!transparentTheme.catppuccin)
      transparentTheme.catppuccin = { [key]: transparent(value) } as Catppuccin;
    else transparentTheme.catppuccin[key] = transparent(value);
  });
  Object.entries(colorMap).map(([key, innerMap]) =>
    Object.entries(innerMap).map(([innerKey, colorKey]) => {
      // TODO: Remove @ts-ignore

      const color = colors[colorKey];
      // @ts-ignore
      if (!theme[key]) theme[key] = { [innerKey]: color };
      // @ts-ignore
      else theme[key][innerKey] = color;

      // @ts-ignore
      if (!transparentTheme[key])
        // @ts-ignore
        transparentTheme[key] = { [innerKey]: transparent(color) } as {
          default: string;
          paper: string;
        } & PaletteColor;
      // @ts-ignore
      else transparentTheme[key][innerKey] = transparent(color);
      // @ts-ignore
      if (innerKey === "main") addLightAndDark(transparentTheme[key]);
    })
  );

  return [palette, theme, transparentTheme];
}

export function transparent(color: string) {
  return `${color}${transparency}`;
}

function addLightAndDark(intent: PaletteColor) {
  const tonalOffsetLight = 0.2;
  const tonalOffsetDark = 0.2 * 1.5;

  intent.light = lighten(intent.main, tonalOffsetLight);
  intent.dark = darken(intent.main, tonalOffsetDark);
}

export type Catppuccin = {
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

export type TransparentColors = { catppuccin: Catppuccin } & Theme;

type PaletteColor = {
  light: string;
  main: string;
  dark: string;
};

type Theme = {
  background: { default: string; paper: string };
  error: PaletteColor;
  primary: PaletteColor;
  info: PaletteColor;
  secondary: PaletteColor;
  success: PaletteColor;
  warning: PaletteColor;
};

type ColorKey = keyof typeof mochaColors;
