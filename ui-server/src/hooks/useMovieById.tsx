import { usePopularMovies } from './usePopularMovies';
import { Item } from '@/types/item';

export const useMovieById = (id: string) => {
  const { data = [], ...rest } = usePopularMovies();
  const movie = data.find((m: Item) => m.id === id);

  return {
    movie,
    ...rest,
  };
};
