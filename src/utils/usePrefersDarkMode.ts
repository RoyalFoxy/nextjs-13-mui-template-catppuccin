import useMediaQuery from "./useMediaQuery";

export default function usePrefersDarkMode(defaultValue: boolean) {
  return useMediaQuery("(prefers-color-scheme: dark)", defaultValue);
}
