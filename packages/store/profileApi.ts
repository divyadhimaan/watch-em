import { http } from "./httpClient";
import type { UserProfile } from "@app-types/user";

export const profileApi = {
  getMe: (token: string) =>
    http<UserProfile>("/api/profile/me", { token }),

  updateMe: (token: string, body: Partial<UserProfile>) =>
    http<UserProfile>("/api/profile/me", {
      method: "PUT",
      body,
      token,
    }),

  addFavourite: (token: string, movieId: number) =>
    http<UserProfile>(`/api/profile/me/favourites/${movieId}`, {
      method: "POST",
      token,
    }),

  removeFavourite: (token: string, movieId: number) =>
    http<{ message: string }>(
      `/api/profile/me/favourites/${movieId}`,
      {
        method: "DELETE",
        token,
      }
    ),
};
