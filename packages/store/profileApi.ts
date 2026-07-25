import { http } from "./httpClient";
import type { UserProfile, WatchlistItem, Playlist } from "./types";

export type AddToPlaylistPayload = {
  tmdb_id: number;
  media_type: string;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
};


export const profileApi = {
  getMe: (token: string) =>
    http<UserProfile>("/profile/me", { token }),

  updateMe: (token: string, body: Partial<UserProfile>) =>
    http<UserProfile>("/profile/me", {
      method: "PUT",
      body,
      token,
    }),

  addFavourite: (token: string, movieId: number) =>
    http<UserProfile>(`/profile/me/favourites/${movieId}`, {
      method: "POST",
      token,
    }),

  removeFavourite: (token: string, movieId: number) =>
    http<{ message: string }>(
      `/profile/me/favourites/${movieId}`,
      {
        method: "DELETE",
        token,
      }
    ),

  getWatchlist: (token: string) =>
    http<WatchlistItem[]>("/profile/me/watchlist", { token }),

  addToWatchlist: (token: string, items: WatchlistItem[]) =>
    http<WatchlistItem[]>("/profile/me/watchlist", {
      method: "POST",
      body: items,
      token,
    }),

  removeFromWatchlist: (token: string, tmdbId: number) =>
    http<{ message: string }>(`/profile/me/watchlist/${tmdbId}`, {
      method: "DELETE",
      token,
    }),

  toggleWatched: (token: string, tmdbId: number) =>
    http<WatchlistItem>(`/profile/me/watchlist/${tmdbId}/watched`, {
      method: "PATCH",
      token,
    }),

  getPlaylists: (token: string) =>
    http<Playlist[]>("/profile/me/playlists", { token }),

  createPlaylist: (token: string, title: string) =>
    http<Playlist>("/profile/me/playlists", {
      method: "POST",
      body: { title },
      token,
    }),

  getPlaylist: (token: string, playlistId: number) =>
    http<Playlist>(`/profile/me/playlists/${playlistId}`, { token }),

  deletePlaylist: (token: string, playlistId: number) =>
    http<{ message: string }>(`/profile/me/playlists/${playlistId}`, {
      method: "DELETE",
      token,
    }),

  addToPlaylist: (token: string, playlistId: number, item: AddToPlaylistPayload) =>
    http<Playlist>(`/profile/me/playlists/${playlistId}/items`, {
      method: "POST",
      body: item,
      token,
    }),

  removeFromPlaylist: (token: string, playlistId: number, tmdbId: number, mediaType: string) =>
    http<Playlist>(
      `/profile/me/playlists/${playlistId}/items/${tmdbId}?mediaType=${encodeURIComponent(mediaType)}`,
      { method: "DELETE", token }
    ),
};
