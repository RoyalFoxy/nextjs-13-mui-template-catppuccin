import useMediaQuery from "@utils/useMediaQuery";

export default function usePrefersDarkMode(serverDarkMode: boolean) {
  return useMediaQuery("(prefers-color-scheme: dark)", serverDarkMode);
}
