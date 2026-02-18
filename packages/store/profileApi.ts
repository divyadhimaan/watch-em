import { http } from "./httpClient";

export const profileApi = {
  getMe: (token: string) =>
    http<any>("/api/profile/me", { token }),

  updateMe: (token: string, body: any) =>
    http<any>("/api/profile/me", {
      method: "PUT",
      body,
      token,
    }),

  addFavourite: (token: string, movieId: number) =>
    http<any>(`/api/profile/me/favourites/${movieId}`, {
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
