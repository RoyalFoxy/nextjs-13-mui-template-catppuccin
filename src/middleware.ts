import { NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

export function middleware(request: Request) {
  const requestHeaders = new Headers(request.headers);

  const userAgent = new UAParser(requestHeaders.get("user-agent") || "");
  const engineIsBlink = userAgent.getEngine().name === "Blink";

  requestHeaders.set("x-url", request.url);

  if (!engineIsBlink) return NextResponse.next();

  if (requestHeaders.get("sec-ch-prefers-color-scheme"))
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  requestHeaders.set("Accept-CH", "Sec-CH-Prefers-Color-Scheme");
  requestHeaders.set("Vary", "Sec-CH-Prefers-Color-Scheme");
  requestHeaders.set("Critical-CH", "Sec-CH-Prefers-Color-Scheme");

  return new NextResponse(null, { headers: requestHeaders });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
