export type UserProfile = {
    id: number;
    username: string;
    avatarUrl?: string;
    country?: string;
    bio?: string;
    favouriteMovieIds?: number[];
  };