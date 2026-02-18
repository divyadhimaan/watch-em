import { http } from "./httpClient";
import type { AuthRequest, AuthResponse } from "@app-types/auth";

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
