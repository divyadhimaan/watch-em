"use client";

import { useEffect, useState, useCallback } from "react";
import { searchApi } from "@store/catalogApi";
import type { TMDBMovie, TMDBSeries } from "@app-types/tmdb";

export type SearchResult = TMDBMovie | TMDBSeries;

export function useSearch(query: string) {
  const [data, setData] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSearch = useCallback(async () => {
    if (!query?.trim()) {
      setData([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const results = await searchApi.search({
        query,
        includeAdult: false,
      });

      setData(results);
    } catch (err: any) {
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);

  return {
    data,
    loading,
    error,
    refetch: fetchSearch,
  };
}