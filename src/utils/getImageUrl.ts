export const resolveAvatarUrl = (avatarUrl?: string | null): string | undefined => {
  if (!avatarUrl) return undefined;
  if (avatarUrl.startsWith("http")) return avatarUrl;
  // New frontend avatars (e.g. /avatars/avatar-male.jpg) — served by Next.js
  if (avatarUrl.startsWith("/avatars/avatar-")) return avatarUrl;
  // Old backend-style paths — backend has no static folder so these never loaded;
  // return undefined so callers fall back to initials
  return undefined;
};

export const getImageUrl = (
  path: string | null | undefined,
  size: ImageSize = "w500"
): string => {
  if (!path) return "/placeholder.jpg"; // fallback image
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

  export type BackdropSize = "w300" | "w780" | "w1280" | "original";
  export type LogoSize = "w45" | "w92" | "w154" | "w185" | "w300" | "w500" | "original";
  export type PosterSize = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";

  export type ImageSize = BackdropSize | LogoSize | PosterSize; 
