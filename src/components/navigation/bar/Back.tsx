"use client";

import Link from "@navigation/Link";
import { usePathname } from "next/navigation";

export default function Back() {
  const pathname = usePathname();
  let level = 0;
  if (pathname.match(/\//gm)?.length === 1 && pathname !== "/") level = 1;
  else if (pathname !== "/") level = pathname.match(/\//gm)?.length as number;

  switch (level) {
    case 0:
      return null;
    case 1:
      return <LinkWrapper href="/" />;
    default:
      return <LinkWrapper href={pathname.split("/").slice(0, -1).join("/")} />;
  }
}

interface LinkWrapper {
  href: string;
}

function LinkWrapper({ href }: LinkWrapper) {
  return (
    <Link
      href={href}
      noPreview>
      cd ..
    </Link>
  );
}
