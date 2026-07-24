export type OTTPlatform = {
  id: string;
  label: string;
  color: string;
  logo: string; // path under /images/streaming/ or emoji fallback
};

export const OTT_PLATFORMS: OTTPlatform[] = [
  { id: "netflix", label: "Netflix", color: "#E50914", logo: "N" },
  { id: "prime", label: "Prime Video", color: "#00A8E0", logo: "P" },
  { id: "hotstar", label: "JioHotstar", color: "#1C71DA", logo: "H" },
  { id: "sonyliv", label: "SonyLIV", color: "#0057A8", logo: "S" },
  { id: "zee5", label: "ZEE5", color: "#8B2BE2", logo: "Z" },
  { id: "mxplayer", label: "MX Player", color: "#00D4AA", logo: "M" },
  { id: "aha", label: "Aha", color: "#FF5400", logo: "A" },
  { id: "jiocinema", label: "JioCinema", color: "#6B21A8", logo: "J" },
];

export type RoomParticipant = {
  name: string;
  vibeIds: string[];
  ottIds: string[];
  // movie/series IDs they swiped right on (from /vibe page)
  savedIds?: number[];
};

export type WatchRoom = {
  id: string;
  createdAt: number;
  participants: RoomParticipant[];
};

// Generate a short random room ID
export function generateRoomId(): string {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

// Encode room state as a URL-safe base64 string
export function encodeRoom(room: WatchRoom): string {
  return btoa(encodeURIComponent(JSON.stringify(room)));
}

// Decode room state from URL param
export function decodeRoom(encoded: string): WatchRoom | null {
  try {
    return JSON.parse(decodeURIComponent(atob(encoded)));
  } catch {
    return null;
  }
}

// Find OTT platforms at least N participants have
export function getSharedOTTs(
  participants: RoomParticipant[],
  minCount = 1
): string[] {
  const counts: Record<string, number> = {};
  for (const p of participants) {
    for (const ott of p.ottIds) {
      counts[ott] = (counts[ott] ?? 0) + 1;
    }
  }
  return Object.entries(counts)
    .filter(([, count]) => count >= minCount)
    .map(([id]) => id);
}

// Get the dominant vibe slugs across all participants
export function getMergedVibes(participants: RoomParticipant[]): string[] {
  const vibeCount: Record<string, number> = {};
  for (const p of participants) {
    for (const v of p.vibeIds) {
      vibeCount[v] = (vibeCount[v] ?? 0) + 1;
    }
  }
  // Return top 2 vibes by frequency
  return Object.entries(vibeCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([id]) => id);
}

// localStorage key for room data
export const ROOM_STORAGE_KEY = "watchem_rooms";

export function saveRoomToStorage(room: WatchRoom): void {
  try {
    const existing = JSON.parse(
      localStorage.getItem(ROOM_STORAGE_KEY) ?? "{}"
    );
    existing[room.id] = room;
    localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(existing));
  } catch {}
}

export function getRoomFromStorage(id: string): WatchRoom | null {
  try {
    const all = JSON.parse(localStorage.getItem(ROOM_STORAGE_KEY) ?? "{}");
    return all[id] ?? null;
  } catch {
    return null;
  }
}