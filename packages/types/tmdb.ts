export type TMDBListResponse<T> = {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
  };
  
  export type TMDBMovie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
  };
  
  export type TMDBSeries = {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    first_air_date: string;
    vote_average: number;
  };
  