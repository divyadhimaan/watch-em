import { useState, useEffect, useCallback } from "react";

export type WatchlistItem = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
  media_type: "movie" | "series";
  vibes?: { emoji: string; label: string }[];
};

const STORAGE_KEY = "watchlist";

function readStorage(): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeStorage(items: WatchlistItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useWatchlist() {
  const [items, setItems] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    setItems(readStorage());
  }, []);

  const add = useCallback((toAdd: WatchlistItem[]) => {
    setItems((prev) => {
      const existingIds = new Set(prev.map((i) => i.id));
      const fresh = toAdd.filter((i) => !existingIds.has(i.id));
      const next = [...prev, ...fresh];
      writeStorage(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: number) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      writeStorage(next);
      return next;
    });
  }, []);

  return { items, add, remove };
}
