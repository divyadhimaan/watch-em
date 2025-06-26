import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Item } from '@/types/item';

export const usePopularMovies = () => {
  return useQuery<Item[]>({
    queryKey: ['popular-movies'],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/movies/popular`);
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // optional: data is fresh for 5 mins
  });
};
