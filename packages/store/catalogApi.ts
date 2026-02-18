import { http } from "./httpClient";

/* ---------------------------------- */
/* ------------ MOVIES -------------- */
/* ---------------------------------- */

export const moviesApi = {
  getAll: () =>
    http<any>("/movies/all"),

  getPopular: () =>
    http<any>("/movies/popular"),

  getUpcoming: () =>
    http<any>("/movies/upcoming"),

  getInTheatres: () =>
    http<any>("/movies/in-theatres"),

  getTopRated: () =>
    http<any>("/movies/top-rated"),

  getDetails: (id: number) =>
    http<any>(`/movies/details/${id}`),

  getByFilter: (slug: string) =>
    http<any>(`/movies/filter/${slug}`),
};

/* ---------------------------------- */
/* ------------ SERIES -------------- */
/* ---------------------------------- */

export const seriesApi = {
  getAll: () =>
    http<any>("/series/all"),

  getPopular: () =>
    http<any>("/series/popular"),

  getOnAir: () =>
    http<any>("/series/on-air"),

  getTopRated: () =>
    http<any>("/series/top-rated"),

  getDetails: (id: number) =>
    http<any>(`/series/details/${id}`),

  getByFilter: (slug: string) =>
    http<any>(`/series/filter/${slug}`),
};

/* ---------------------------------- */
/* ----------- ENTITIES ------------- */
/* ---------------------------------- */

export const entitiesApi = {
  getFiltersBySlug: (slug: string) =>
    http<any>(`/entities/filters/${slug}`),
};
