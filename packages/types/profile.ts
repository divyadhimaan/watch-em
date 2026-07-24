export type UserProfileDTO = {
    id: number;
    username: string;
    avatarUrl?: string;
    country?: string;
    bio?: string;
    userId: number;
    favouriteMovieIds: number[];
  };
  
  export type UserProfileUpdateRequest = {
    avatarUrl?: string;
    country?: string;
    bio?: string;
  };
  