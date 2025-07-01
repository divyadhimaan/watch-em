import { useEffect, useState } from 'react';
import axios from 'axios';

import { Item } from '@/types/item'; 

export const useMovies = () => {
  const [movies, setMovies] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      console.log("Fetching movies...");

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/movies/all`);
        console.log("Movies fetched successfully:", res.data);
        setMovies(res.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch movie');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    movies,
    loading,
    error,
  };
};
