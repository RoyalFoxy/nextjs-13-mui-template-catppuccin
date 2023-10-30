"use client";

import {
  ReactNode,
  createContext,
  useContext as useCtx,
  useEffect,
  useState,
} from "react";

import { usePathname } from "next/navigation";

const pageNameMap: { [key: string]: string } = {
  "/": "Home",
  "/about": "About",
};

interface Context {
  pageName: string;
}

const context = createContext({} as Context);

export function useGlobalContext() {
  return useCtx(context);
}

interface GlobalContext {
  children: ReactNode | ReactNode[];
}

export function useSetPageName(pageName: string) {
  const ctx = useGlobalContext();
  ctx.pageName = pageName;
}

export default function GlobalContext({ children }: GlobalContext) {
  const [getPageName, setPageName] = useState("");

  const ctx: Context = {
    get pageName() {
      return getPageName;
    },
    set pageName(newValue) {
      setPageName(newValue);
    },
  };

  const pathname = usePathname();

  useEffect(() => {
    const name = pageNameMap[pathname];
    setPageName(name || "Not found");
  }, [pathname]);

  return <context.Provider value={ctx}>{children}</context.Provider>;
}
