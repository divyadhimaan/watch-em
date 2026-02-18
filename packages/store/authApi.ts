import { http } from "./httpClient";

export type AuthRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  userId: number;
};

export const authApi = {
  signup: (body: AuthRequest) =>
    http<AuthResponse>("/api/auth/signup", {
      method: "POST",
      body,
    }),

  login: (body: AuthRequest) =>
    http<AuthResponse>("/api/auth/login", {
      method: "POST",
      body,
    }),
};
