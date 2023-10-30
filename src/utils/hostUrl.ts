import { headers as getHeaders } from "next/dist/client/components/headers";

export default function host() {
  const headers = getHeaders();
  return (
    headers.get("referer")?.split("/").slice(0, 3).join("/") ||
    `${headers.get("x-forwarded-proto")}://${headers.get("x-forwarded-host")}`
  );
}
