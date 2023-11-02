import { NextRequest, NextResponse } from "next/server";

import { load } from "cheerio";

export async function POST(req: NextRequest) {
  // const entries = req.headers.entries();

  // const entryArray = new Array();

  // while (true) {
  //   const entry = entries.next();
  //   if (entry.done) break;
  //   entryArray.push(entry.value.map((part) => `'${part}'`).join(" => "));
  // }
  // return NextResponse.json(entryArray);

  const body = await req.text();
  let parsedBody = null;
  try {
    parsedBody = JSON.parse(body);
  } catch (error) {
    console.error(error);
    return new NextResponse(null, { status: 400 });
  }

  if (Object.keys(parsedBody).length !== 1 || !parsedBody.preview)
    return new NextResponse(null, { status: 400 });

  let { preview }: { preview: string } = parsedBody;

  if (preview.startsWith("/")) {
    preview = req.url.split("/").slice(0, 3).join("/") + preview;
  }

  const headers = new Headers();

  const origin = req.headers.get("origin");
  if (origin) headers.set("origin", origin);

  const userAgent = req.headers.get("user-agent");
  if (userAgent) headers.set("user-agent", userAgent);

  const response = await fetch(preview, { headers: headers });

  const $ = load(await response.text());

  const metadata = {
    title:
      $('meta[property="og:title"]').attr("content") ||
      $("title").text() ||
      undefined,
    description:
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      undefined,
    image: $('meta[property="og:image"]').attr("content") || undefined,
    url: $('meta[property="og:url"]').attr("content") || preview,
    site_name: $('meta[property="og:site_name"]').attr("content") || undefined,
  };

  return NextResponse.json(metadata);
}

export interface Preview {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  site_name?: string;
}
