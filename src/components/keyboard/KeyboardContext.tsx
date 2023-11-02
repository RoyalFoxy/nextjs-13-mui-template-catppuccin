"use client";

import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Context {
  events: KeyboardEvent[];
}

const context = createContext<Context>({} as Context);

export function useKeyboardContext() {
  return useContext(context);
}

export function useKeyPressed(code: string) {
  const ctx = useKeyboardContext();

  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    setIsPressed(ctx.events.some((event) => event.code === code));
  }, [ctx.events, code]);

  return isPressed;
}

interface KeyboardContext {
  children: ReactElement;
}

export function KeyboardContext({ children }: KeyboardContext) {
  const [getEvents, setEvents] = useState<KeyboardEvent[]>([]);

  const ctx: Context = {
    get events() {
      return getEvents;
    },
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const down = (event: KeyboardEvent) => {
      if (getEvents.some((element) => element.code === event.code)) return;

      setEvents((events) => [...events, event]);
    };

    const up = (event: KeyboardEvent) => {
      const elementIndex = getEvents.findIndex(
        (element) => element.code === event.code
      );

      setEvents((events) => [
        ...events.slice(0, elementIndex),
        ...events.slice(elementIndex + 1),
      ]);
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [getEvents]);

  return <context.Provider value={ctx}>{children}</context.Provider>;
}
