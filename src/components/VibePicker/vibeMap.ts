export type VibeTag = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  // Maps to your existing /movies/filter/${slug} and /series/filter/${slug} endpoints
  movieSlug: string;
  seriesSlug: string;
  // TMDB genre IDs for reference
  genreIds: number[];
};

export const VIBE_TAGS: VibeTag[] = [
  {
    id: "edge-of-seat",
    label: "Edge of Seat",
    emoji: "😰",
    description: "Can't look away, pulse racing",
    movieSlug: "thriller",
    seriesSlug: "thriller",
    genreIds: [53, 27], // Thriller, Horror
  },
  {
    id: "easy-watch",
    label: "Easy Watch",
    emoji: "😌",
    description: "Half-watch while you eat",
    movieSlug: "comedy",
    seriesSlug: "comedy",
    genreIds: [35], // Comedy
  },
  {
    id: "feel-good",
    label: "Feel Good",
    emoji: "🥰",
    description: "Warm, cozy, uplifting",
    movieSlug: "romance",
    seriesSlug: "romance",
    genreIds: [10749, 35], // Romance, Comedy
  },
  {
    id: "high-energy",
    label: "High Energy",
    emoji: "💥",
    description: "Turn brain off, pure adrenaline",
    movieSlug: "action",
    seriesSlug: "action-adventure",
    genreIds: [28, 12], // Action, Adventure
  },
  {
    id: "slow-burn",
    label: "Slow Burn",
    emoji: "🔥",
    description: "Emotionally heavy, deeply rewarding",
    movieSlug: "drama",
    seriesSlug: "drama",
    genreIds: [18], // Drama
  },
  {
    id: "mind-bending",
    label: "Mind Bending",
    emoji: "🌀",
    description: "Leaves you thinking for days",
    movieSlug: "science-fiction",
    seriesSlug: "sci-fi-fantasy",
    genreIds: [878, 9648], // Sci-Fi, Mystery
  },
  {
    id: "laugh-out-loud",
    label: "Laugh Out Loud",
    emoji: "😂",
    description: "Genuinely funny, no filter",
    movieSlug: "comedy",
    seriesSlug: "comedy",
    genreIds: [35],
  },
  {
    id: "dark-twisted",
    label: "Dark & Twisted",
    emoji: "🖤",
    description: "Uncomfortable but can't stop",
    movieSlug: "crime",
    seriesSlug: "crime",
    genreIds: [80, 27], // Crime, Horror
  },
  {
    id: "adventure",
    label: "Epic Journey",
    emoji: "🗺️",
    description: "Big world, bigger stakes",
    movieSlug: "adventure",
    seriesSlug: "action-adventure",
    genreIds: [12, 14], // Adventure, Fantasy
  },
  {
    id: "documentary",
    label: "Real & Raw",
    emoji: "🎥",
    description: "True stories that matter",
    movieSlug: "documentary",
    seriesSlug: "documentary",
    genreIds: [99],
  },
];

// Given two selected vibe IDs, return the best combined slug
export function resolveVibeToSlug(
  vibeIds: string[],
  type: "movie" | "series"
): string {
  if (vibeIds.length === 0) return "popular";
  const key = type === "movie" ? "movieSlug" : "seriesSlug";
  // If both selected, prefer the first one (could be smarter with AI)
  const primary = VIBE_TAGS.find((v) => v.id === vibeIds[0]);
  return primary?.[key] ?? "popular";
}