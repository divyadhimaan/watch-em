'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Entity {
  id: string | number;
  title?: string;
  name?: string;
  poster_path?: string;
  image?: string;
}

interface UseEntityResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

/**
 * Generic entity fetcher hook.
 * Works for any entity type — movies, series, people, etc.
 */
export const useEntity = <T extends Entity>(
  entityType: string,
  options?: { query?: string; params?: Record<string, string | number> }
): UseEntityResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      console.log(`Fetching ${entityType}...`);

      try {
        const baseURL = process.env.NEXT_PUBLIC_API_BASE;
        const queryString = options?.query ? `/${options.query}` : '/all';
        const res = await axios.get(`${baseURL}/api/${entityType}${queryString}`, {
          params: options?.params,
        });

        console.log(`${entityType} fetched successfully:`, res.data);
        setData(res.data);
      } catch (err: any) {
        setError(err.message || `Failed to fetch ${entityType}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [entityType, JSON.stringify(options)]);

  return { data, loading, error };
};
