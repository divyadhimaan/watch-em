import { useEffect, useState } from 'react';
import axios from 'axios';

import { MovieDetail } from '@/types/movie-detail';

export const useMovieById = (id: string) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || id.trim() === '') return;
    

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      console.log("fetching movie with id in hook:", id);

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/movie/details/${id}`);
        setMovie(res.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch movie');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return {
    movie,
    loading,
    error,
  };
};
