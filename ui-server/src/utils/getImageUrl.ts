export const getImageUrl = (path: string | null | undefined, size: string = "w500"): string => {
    if (!path) return "/placeholder.jpg"; // fallback image if path is missing
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };
  