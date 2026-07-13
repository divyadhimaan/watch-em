// Re-export all types needed by store API files via relative paths.
// This avoids tsconfig path alias resolution issues when package files
// are compiled outside the src/ root during `next build`.

export type { UserProfile } from "@app-types/user";
export type { AuthRequest, AuthResponse } from "@app-types/auth";
export type { TMDBMovie, TMDBSeries, TMDBMovieDetails } from "@app-types/tmdb";
export type { EntityType } from "@app-types/Entity";
