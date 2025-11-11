import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Item } from '@/types/item';

export const useMoviesByCategory = (category: string) => {
  return useQuery<Item[]>({
    queryKey: ['movies', category],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/movies/${category}`);
      return res.data?.results ?? []; 
    },
    staleTime: 1000 * 60 * 5,
  });
};

