export interface Genre {
    id: number;
    name: string;
  }
  
  export interface ProductionCompany {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }
  
  export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
  }
  
  export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
  }

  export interface ProviderDetails {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
  }
  
  export interface WatchProvider {
    link: string;
    flatrate?: ProviderDetails[];
    rent?: ProviderDetails[];
    buy?: ProviderDetails[];
  }
  
  export interface MovieDetail {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null | any;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    watch_providers: WatchProvider | null;
  }
  