export type Profile = {
    userId: string | number;
    avatarUrl: string;
    country?: string | null;
    bio?: string | null;
    favourites: any[];
    playlists: any[];
  };

export type User = {
    username?: string;
    email?: string;
}