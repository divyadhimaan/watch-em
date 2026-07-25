import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi, type AddToPlaylistPayload } from "@store/profileApi";
import { useAuth } from "@/context/AuthContext";

export type { AddToPlaylistPayload } from "@store/profileApi";

export function usePlaylists() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { data: playlists = [], isLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => {
      if (!token) throw new Error("No auth token");
      return profileApi.getPlaylists(token);
    },
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: (title: string) => {
      if (!token) throw new Error("Not authenticated");
      return profileApi.createPlaylist(token, title);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (playlistId: number) => {
      if (!token) throw new Error("Not authenticated");
      return profileApi.deletePlaylist(token, playlistId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
  });

  const addMutation = useMutation({
    mutationFn: ({ playlistId, item }: { playlistId: number; item: AddToPlaylistPayload }) => {
      if (!token) throw new Error("Not authenticated");
      return profileApi.addToPlaylist(token, playlistId, item);
    },
    onSuccess: (_data, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      queryClient.invalidateQueries({ queryKey: ["playlist", playlistId] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: ({
      playlistId,
      tmdbId,
      mediaType,
    }: {
      playlistId: number;
      tmdbId: number;
      mediaType: string;
    }) => {
      if (!token) throw new Error("Not authenticated");
      return profileApi.removeFromPlaylist(token, playlistId, tmdbId, mediaType);
    },
    onSuccess: (_data, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      queryClient.invalidateQueries({ queryKey: ["playlist", playlistId] });
    },
  });

  return {
    playlists,
    isLoading,
    createPlaylist: (title: string) => createMutation.mutate(title),
    createPlaylistAsync: (title: string) => createMutation.mutateAsync(title),
    deletePlaylist: (id: number) => deleteMutation.mutate(id),
    addToPlaylist: (playlistId: number, item: AddToPlaylistPayload) =>
      addMutation.mutateAsync({ playlistId, item }),
    removeFromPlaylist: (playlistId: number, tmdbId: number, mediaType: string) =>
      removeMutation.mutate({ playlistId, tmdbId, mediaType }),
    isAdding: addMutation.isPending,
  };
}
