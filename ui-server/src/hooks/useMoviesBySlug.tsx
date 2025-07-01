import { useEffect, useState } from 'react';
import axios from 'axios';

import { Item } from '@/types/item'; 

export const useMoviesBySlug = (slug: string) => {
  const [movies, setMovies] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug || slug.trim() === '') return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      console.log("Fetching movies with slug:", slug);

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/movies/filters/${slug}`);
        setMovies(res.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch movie');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return {
    movies,
    loading,
    error,
  };
};
