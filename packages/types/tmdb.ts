export type TMDBListResponse<T> = {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
  };
  
  export type TMDBMovie = {
    id: string;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
  };
  
  export type TMDBSeries = {
    id: string;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    first_air_date: string;
    vote_average: number;
  };
  

  export type TMDBMovieDetails = {
    id: number;
  
    adult: boolean;
  
    title: string;
    original_title: string;
    original_language: string;
  
    overview: string;
    tagline: string;
    status: string;
    homepage: string;
    imdb_id: string;
  
    poster_path: string;
    backdrop_path: string;
  
    popularity: number;
    vote_average: number;
    vote_count: number;
  
    release_date: string;
    runtime: number;
  
    budget: number;
    revenue: number;
  
    video: boolean;
  
    genres: {
      id: number;
      name: string;
    }[];
  
    production_companies: {
      id: number;
      name: string;
      logo_path: string;
      origin_country: string;
    }[];
  
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
  
    spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
    }[];
  
    belongs_to_collection?: {
      id: number;
      name: string;
      poster_path: string;
      backdrop_path: string;
    } | null;
  };
  