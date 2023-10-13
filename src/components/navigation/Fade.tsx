"use client";

import {
  ReactElement,
  createContext,
  useContext as useCtx,
  useState,
} from "react";
import InnerFade from "./InnerFade";

interface Context {
  visible: boolean;
  isExiting: boolean;
  nextHref: string;
}

const context = createContext<Context>({} as Context);

export function useContext() {
  return useCtx(context);
}

interface Fade {
  children: ReactElement;
}

export function Fade({ children }: Fade) {
  const [getVisible, setVisible] = useState(false);
  const [getIsExiting, setIsExiting] = useState(false);
  const [getNextHref, setNextHref] = useState("");

  const ctx: Context = {
    get visible() {
      return getVisible;
    },
    set visible(value) {
      setVisible(value);
    },
    get isExiting() {
      return getIsExiting;
    },
    set isExiting(value) {
      setIsExiting(value);
    },
    get nextHref() {
      return getNextHref;
    },
    set nextHref(value) {
      setNextHref(value);
    },
  };
  return (
    <context.Provider value={ctx}>
      <InnerFade>{children}</InnerFade>
    </context.Provider>
  );
}
