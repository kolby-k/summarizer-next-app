// app/summarize/SummaryContext.tsx
"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
  type ReactNode,
  useRef,
} from "react";
import { getItem, setItem } from "../lib/storage";

export type Summary = {
  id: string;
  url: string;
  title: string;
  summary: string;
  bias: string;
  createdAt: number;
};

type State = {
  currentSummary: Summary | null;
  bookmarks: Summary[];
};

type Action =
  | { type: "SET_CURRENT"; payload: Summary | null }
  | { type: "ADD_BOOKMARK"; payload: Summary }
  | { type: "REMOVE_BOOKMARK"; payload: string }
  | { type: "SET_BOOKMARKS"; payload: Summary[] };

type Ctx = {
  currentSummary: Summary | null;
  bookmarks: Summary[];
  setCurrentSummary: (s: Summary | null) => void;
  addBookmark: (s: Summary) => void;
  removeBookmark: (id: string) => void;
  setBookmarks: (list: Summary[]) => void;
};

const SummaryContext = createContext<Ctx | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_CURRENT":
      return { ...state, currentSummary: action.payload };

    case "ADD_BOOKMARK": {
      const exists = state.bookmarks.some((b) => b.id === action.payload.id);
      if (exists) return state;
      return { ...state, bookmarks: [action.payload, ...state.bookmarks] };
    }

    case "REMOVE_BOOKMARK":
      return {
        ...state,
        bookmarks: state.bookmarks.filter((b) => b.id !== action.payload),
      };

    case "SET_BOOKMARKS":
      return { ...state, bookmarks: action.payload };

    default:
      return state;
  }
}

export function SummaryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    currentSummary: null,
    bookmarks: [],
  });
  // Prevent writing to LS until we've loaded once.
  const hydrated = useRef(false);

  // Load once on mount
  useEffect(() => {
    // robust parse: don't crash on bad JSON
    let stored: Summary[] = [];
    try {
      stored = getItem<Summary[]>("bookmarks") ?? [];
    } catch {
      stored = [];
    }
    dispatch({ type: "SET_BOOKMARKS", payload: stored });
    hydrated.current = true; // now safe to persist
  }, []);

  // Persist whenever bookmarks change *after* hydration
  useEffect(() => {
    if (!hydrated.current) return; // skip first render write
    setItem("bookmarks", state.bookmarks);
  }, [state.bookmarks]);
  const value = useMemo<Ctx>(
    () => ({
      currentSummary: state.currentSummary,
      bookmarks: state.bookmarks,
      setCurrentSummary: (s) => dispatch({ type: "SET_CURRENT", payload: s }),
      addBookmark: (s) => dispatch({ type: "ADD_BOOKMARK", payload: s }),
      removeBookmark: (id) =>
        dispatch({ type: "REMOVE_BOOKMARK", payload: id }),
      setBookmarks: (list) =>
        dispatch({ type: "SET_BOOKMARKS", payload: list }),
    }),
    [state.currentSummary, state.bookmarks]
  );

  return (
    <SummaryContext.Provider value={value}>{children}</SummaryContext.Provider>
  );
}

export function useSummaries() {
  const ctx = useContext(SummaryContext);
  if (!ctx)
    throw new Error("useSummaries must be used within <SummaryProvider>");
  return ctx;
}
