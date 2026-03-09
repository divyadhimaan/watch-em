import { http } from './httpClient'
import type { TMDBMovie, TMDBSeries, TMDBMovieDetails } from '../types/tmdb'
import type { EntityType } from '../types/Entity';
/* ---------------------------------- */
/* ------------ MOVIES -------------- */
/* ---------------------------------- */

export const moviesApi = {
  getAll: (): Promise<TMDBMovie[]> =>
    http<{ results: TMDBMovie[] }>("/movies/all")
      .then(res => res.results),

  getPopular: (): Promise<TMDBMovie[]> =>
    http<{ results: TMDBMovie[] }>("/movies/popular")
      .then(res => res.results),

  getUpcoming: (): Promise<TMDBMovie[]> =>
    http<{ results: TMDBMovie[] }>("/movies/upcoming")
      .then(res => res.results),

  getInTheatres: (): Promise<TMDBMovie[]> =>
    http<{ results: TMDBMovie[] }>("/movies/in-theatres")
      .then(res => res.results),

  getTopRated: (): Promise<TMDBMovie[]> =>
    http<{ results: TMDBMovie[] }>("/movies/top-rated")
      .then(res => res.results),

  getDetails: (id: number): Promise<TMDBMovieDetails> =>
      http<TMDBMovieDetails>(`/movies/details/${id}`),

  getByFilter: (slug: string): Promise<TMDBMovie[]> =>
    http<{ results: TMDBMovie[] }>(`/movies/filter/${slug}`)
      .then(res => res.results),

    getByCategory: (category: string): Promise<TMDBMovie[]> => {
      switch (category) {
        case "popular":
          return moviesApi.getPopular();
        case "upcoming":
          return moviesApi.getUpcoming();
        case "in-theatres":
          return moviesApi.getInTheatres();
        case "top-rated":
          return moviesApi.getTopRated();
        case "all":
          return moviesApi.getAll();
        default:
          throw new Error(`Unsupported movie category: ${category}`);
      }
    },
};

/* ---------------------------------- */
/* ------------ SERIES -------------- */
/* ---------------------------------- */

export const seriesApi = {
  getAll: (): Promise<TMDBSeries[]> =>
    http<{ results: TMDBSeries[] }>("/series/all")
      .then(res => res.results),

  getPopular: (): Promise<TMDBSeries[]> =>
    http<{ results: TMDBSeries[] }>("/series/popular")
      .then(res => res.results),

  getOnAir: (): Promise<TMDBSeries[]> =>
    http<{ results: TMDBSeries[] }>("/series/on-air")
      .then(res => res.results),

  getTopRated: (): Promise<TMDBSeries[]> =>
    http<{ results: TMDBSeries[] }>("/series/top-rated")
      .then(res => res.results),

  getDetails: (id: number): Promise<TMDBSeries> =>
    http<TMDBSeries>(`/series/details/${id}`),

  getByFilter: (slug: string): Promise<TMDBSeries[]> =>
    http<{ results: TMDBSeries[] }>(`/series/filter/${slug}`)
      .then(res => res.results),
};

/* ---------------------------------- */
/* ----------- ENTITIES ------------- */
/* ---------------------------------- */

export const entitiesApi = {
  getFiltersBySlug: (
    type: EntityType,
    slug: string
  ): Promise<TMDBMovie[] | TMDBSeries[]> =>
    http<{ results: TMDBMovie[] | TMDBSeries[] }>(
      `/${type}s/filter/${slug}`
    ).then(res => res.results),
};

/* ---------------------------------- */
/* ------------ SEARCH -------------- */
/* ---------------------------------- */

export const searchApi = {
  search: (params: {
    query: string;
    includeAdult?: boolean;
    page?: number;
  }) => {
    const searchParams = new URLSearchParams({
      query: params.query,
      includeAdult: String(params.includeAdult ?? false),
      page: String(params.page ?? 1),
    });

    return http<{ results: (TMDBMovie | TMDBSeries)[] }>(
      `/search?${searchParams.toString()}`
    ).then(res => res.results);
  },
};