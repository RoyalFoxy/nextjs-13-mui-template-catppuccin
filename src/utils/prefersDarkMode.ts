import { headers } from "next/headers";

export default function prefersDarkMode() {
  return headers().get("sec-ch-prefers-color-scheme") === "dark";
}
