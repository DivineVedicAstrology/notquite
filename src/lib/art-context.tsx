import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ART_SLOTS, listArtUrls, type ArtMap } from "@/lib/art";

type ArtContextValue = {
  urls: ArtMap;
  src: (slot: string, fallback?: string) => string;
  refresh: () => Promise<void>;
  setLocal: (slot: string, url: string) => void;
};

const ArtContext = createContext<ArtContextValue | null>(null);

const FALLBACK: Record<string, string> = Object.fromEntries(
  ART_SLOTS.map((s) => [s.slot, s.fallback]),
);

export function ArtProvider({ children }: { children: ReactNode }) {
  const [urls, setUrls] = useState<ArtMap>({});

  const refresh = useCallback(async () => {
    try {
      setUrls(await listArtUrls());
    } catch {
      /* keep current map */
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const setLocal = useCallback((slot: string, url: string) => {
    setUrls((prev) => ({ ...prev, [slot]: url }));
  }, []);

  const value = useMemo<ArtContextValue>(
    () => ({
      urls,
      src: (slot, fallback) => urls[slot] ?? fallback ?? FALLBACK[slot] ?? "",
      refresh,
      setLocal,
    }),
    [urls, refresh, setLocal],
  );

  return <ArtContext.Provider value={value}>{children}</ArtContext.Provider>;
}

export function useSiteArt() {
  const ctx = useContext(ArtContext);
  if (!ctx) {
    return {
      urls: {},
      src: (slot: string, fallback?: string) => fallback ?? FALLBACK[slot] ?? "",
      refresh: async () => {},
      setLocal: () => {},
    };
  }
  return ctx;
}
