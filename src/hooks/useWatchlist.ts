import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@store/profileApi";
import { useAuth } from "@/context/AuthContext";
import type { WatchlistItem } from "@app-types/User";

export type { WatchlistItem } from "@app-types/User";

export function useWatchlist() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { data: items = [] } = useQuery({
    queryKey: ["watchlist"],
    queryFn: () => {
      if (!token) throw new Error("No auth token");
      return profileApi.getWatchlist(token);
    },
    enabled: !!token,
  });

  const addMutation = useMutation({
    mutationFn: (toAdd: WatchlistItem[]) => {
      if (!token) throw new Error("Not authenticated");
      return profileApi.addToWatchlist(token, toAdd);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (tmdbId: number) => {
      if (!token) throw new Error("Not authenticated");
      return profileApi.removeFromWatchlist(token, tmdbId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  const toggleWatchedMutation = useMutation({
    mutationFn: (tmdbId: number) => {
      if (!token) throw new Error("Not authenticated");
      return profileApi.toggleWatched(token, tmdbId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  const add = (toAdd: WatchlistItem[]) => {
    if (token) addMutation.mutate(toAdd);
  };

  const remove = (id: number) => {
    if (token) removeMutation.mutate(id);
  };

  const toggleWatched = (id: number) => {
    if (token) toggleWatchedMutation.mutate(id);
  };

  return { items, add, remove, toggleWatched };
}
