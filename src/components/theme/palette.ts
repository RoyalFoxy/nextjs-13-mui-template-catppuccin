export const transparency = "4c";

type Palette = {
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
  rosewaterTransparent: string;
  flamingoTransparent: string;
  pinkTransparent: string;
  mauveTransparent: string;
  redTransparent: string;
  maroonTransparent: string;
  peachTransparent: string;
  yellowTransparent: string;
  greenTransparent: string;
  tealTransparent: string;
  skyTransparent: string;
  sapphireTransparent: string;
  blueTransparent: string;
  lavenderTransparent: string;
  textTransparent: string;
  subtext1Transparent: string;
  subtext0Transparent: string;
  overlay2Transparent: string;
  overlay1Transparent: string;
  overlay0Transparent: string;
  surface2Transparent: string;
  surface1Transparent: string;
  surface0Transparent: string;
  baseTransparent: string;
  mantleTransparent: string;
  crustTransparent: string;
};

const mochaColors = {
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

export const mocha = {} as Palette;

Object.entries(mochaColors).forEach(([_key, value]) => {
  const key = _key as keyof typeof mochaColors;
  mocha[key] = value;
  mocha[`${key}Transparent`] = `${value}${transparency}`;
});

export const latteColors = {
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

export const latte = {} as Palette;

Object.entries(latteColors).forEach(([_key, value]) => {
  const key = _key as keyof typeof latteColors;
  latte[key] = value;
  latte[`${key}Transparent`] = `${value}${transparency}`;
});
