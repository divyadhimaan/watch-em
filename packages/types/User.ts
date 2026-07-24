export type UserProfile = {
    id: number;
    username: string;
    avatarUrl?: string;
    country?: string;
    bio?: string;
    favouriteMovieIds?: number[];
  };

export type WatchlistItem = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
  media_type: "movie" | "series";
  vibes?: { emoji: string; label: string }[];
  watched?: boolean;
};