import { http } from "./httpClient";
import type { UserProfile, WatchlistItem } from "./types";


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
};
