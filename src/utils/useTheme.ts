import {
  Theme as MuiTheme,
  Opacity,
  Overlays,
  Palette,
  Shadows,
  ZIndex,
  useTheme as useMuiTheme,
} from "@mui/material";

interface Theme extends MuiTheme {
  vars: {
    palette: Palette;
    opacity: Opacity;
    overlays: Overlays;
    shadows: Shadows;
    shape: { borderRadius: number };
    zIndex: ZIndex;
  };
}

export default function useTheme() {
  return useMuiTheme<Theme>();
}
