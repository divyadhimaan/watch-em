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
