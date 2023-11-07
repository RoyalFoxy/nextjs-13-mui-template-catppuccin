"use client";

import { Box, Fade as MuiFade } from "@mui/material";
import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import useTheme from "@useTheme";

interface Context {
  visible: boolean;
  isExiting: boolean;
  nextHref: string;
}

const context = createContext<Context>({} as Context);

export function useFadeContext() {
  return useContext(context);
}

interface FadeContext {
  children: ReactElement;
}

export function FadeContext({ children }: FadeContext) {
  const [getVisible, setVisible] = useState(false);
  const [getIsExiting, setIsExiting] = useState(false);
  const [getNextHref, setNextHref] = useState("");

  const theme = useTheme();
  const router = useRouter();
  const pathName = usePathname();

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

  useEffect(() => {
    setIsExiting(false);
  }, [pathName]);

  useEffect(() => {
    if (getIsExiting || getVisible) return;

    const timeout = setTimeout(
      () => setVisible(true),
      theme.transitions.duration.enteringScreen
    );
    return () => clearTimeout(timeout);
  }, [getIsExiting, getVisible, theme.transitions.duration.enteringScreen]);

  return (
    <context.Provider value={ctx}>
      <MuiFade
        in={getVisible}
        onTransitionEnd={() => {
          if (getIsExiting) router.push(getNextHref);
        }}>
        <Box>{children}</Box>
      </MuiFade>
    </context.Provider>
  );
}
