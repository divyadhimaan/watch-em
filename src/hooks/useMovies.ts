import { useQuery, useQueries } from "@tanstack/react-query";
import { moviesApi } from "@store/catalogApi";
import type { TMDBMovie, TMDBMovieDetails } from "@app-types/tmdb"

/* -------- Generic Category Hook -------- */

export const useMoviesByCategory = (category: string) => {
  return useQuery<TMDBMovie[]>({
    queryKey: ["movies", category],
    queryFn: () => {
      switch (category) {
        case "popular":
          return moviesApi.getPopular();
        case "upcoming":
          return moviesApi.getUpcoming();
        case "in-theatres":
          return moviesApi.getInTheatres();
        case "top-rated":
          return moviesApi.getTopRated();
        default:
          return moviesApi.getAll();
      }
    },
  });
};

export const useAllMovies = () => {
  return useQuery<TMDBMovie[]>({
    queryKey: ["movies", "all"],
    queryFn: () => moviesApi.getAll(),
  });
};

/* -------- Details -------- */

export const useMovieDetails = (id: number) => {
  return useQuery<TMDBMovieDetails>({
    queryKey: ["movie", id],
    queryFn: () => moviesApi.getDetails(id),
    enabled: !!id,
  });
};

/* -------- Filter -------- */

export const useFilteredMovies = (slug: string) => {
  return useQuery({
    queryKey: ["movies", "filter", slug],
    queryFn: () => moviesApi.getByFilter(slug),
    enabled: !!slug,
  });
};

/* -------- Details by a list of ids (e.g. favourites) -------- */

export const useMoviesByIds = (ids: number[]) => {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ["movie", id],
      queryFn: () => moviesApi.getDetails(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
    })),
  });
};

