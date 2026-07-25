"use client";

import { useState, useEffect } from "react";
import { Dialog, Column, Text, Spinner, useToast } from "@once-ui/components";
import { notFound } from "next/navigation";
import { useSearchParams, useRouter } from "next/navigation";
import { useMovieDetails } from "./../../hooks/useMovies";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useAddFavourite, useRemoveFavourite, useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/context/AuthContext";
import { usePlaylists } from "@/hooks/usePlaylists";
import { MovieBackdrop } from "./components/MovieBackdrop";
import { MovieInfo } from "./components/MovieInfo";
import { MovieActions } from "./components/MovieActions";
import { CreatePlaylistDialog } from "./components/CreatePlaylistDialog";

export const DetailDialog = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToast } = useToast();
  const { isAuthenticated } = useAuth();
  const { playlists, createPlaylistAsync, addToPlaylist, isAdding } = usePlaylists();
  const [showPlaylistPicker, setShowPlaylistPicker] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [isAddedToPlaylist, setIsAddedToPlaylist] = useState(false);

  const movieParam = searchParams?.get("movie");
  const movieId = movieParam ? Number(movieParam) : null;
  const isValidId = !movieParam || !Number.isNaN(movieId);
  const isOpen = !!movieId && isValidId;

  // All hooks must be called before any conditional return
  const { data: movie, isLoading } = useMovieDetails(isOpen ? (movieId ?? 0) : 0);
  const { items: watchlistItems, add: addToWatchlist } = useWatchlist();
  const { data: profileData } = useProfile();
  const addFavourite = useAddFavourite();
  const removeFavourite = useRemoveFavourite();

  // biome-ignore lint/correctness/useExhaustiveDependencies: movieId is the trigger, setters are stable
  useEffect(() => {
    setShowPlaylistPicker(false);
    setShowCreateDialog(false);
    setIsAddedToPlaylist(false);
  }, [movieId]);

  if (!isValidId) return notFound();

  // ── Derived state ──────────────────────────────────────────────────────────
  const inWatchlist = movie ? watchlistItems.some((i) => i.id === movie.id) : false;
  const isFavourite = movie
    ? (profileData?.favouriteMovieIds ?? []).includes(movie.id)
    : false;

  const moviePayload = movie
    ? {
        tmdb_id: movie.id,
        media_type: "movie" as const,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      }
    : null;

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleClose = () => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete("movie");
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : window.location.pathname, { scroll: false });
  };

  const handleWatchlist = () => {
    if (!isAuthenticated) {
      addToast({ variant: "danger", message: "Sign in to use your watchlist." });
      return;
    }
    if (!movie || inWatchlist) return;
    addToWatchlist([{
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      media_type: "movie",
    }]);
    addToast({ variant: "success", message: `Added "${movie.title}" to watchlist.` });
  };

  const handleFavourite = () => {
    if (!isAuthenticated) {
      addToast({ variant: "danger", message: "Sign in to save favourites." });
      return;
    }
    if (!movie) return;
    isFavourite ? removeFavourite.mutate(movie.id) : addFavourite.mutate(movie.id);
  };

  const handlePlaylistButtonClick = () => {
    if (!isAuthenticated) {
      addToast({ variant: "danger", message: "Sign in to use playlists." });
      return;
    }
    if (playlists.length === 0) {
      setShowCreateDialog(true);
    } else {
      setShowPlaylistPicker((v) => !v);
    }
  };

  const handlePlaylistSelect = async (playlistId: number) => {
    if (!moviePayload || !movie) return;
    try {
      await addToPlaylist(playlistId, moviePayload);
      addToast({ variant: "success", message: `Added "${movie.title}" to playlist.` });
      setShowPlaylistPicker(false);
      setIsAddedToPlaylist(true);
    } catch {
      addToast({ variant: "danger", message: "Failed to add to playlist." });
    }
  };

  const handleCreateAndAdd = async (name: string) => {
    if (!moviePayload || !movie) return;
    try {
      const created = await createPlaylistAsync(name);
      await addToPlaylist(created.id, moviePayload);
      addToast({
        variant: "success",
        message: `Created "${created.title}" and added "${movie.title}".`,
      });
      setShowCreateDialog(false);
      setShowPlaylistPicker(false);
      setIsAddedToPlaylist(true);
    } catch {
      addToast({ variant: "danger", message: "Failed to create playlist." });
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  // Always render Dialog so once-ui can animate closed and release scroll lock.
  return (
    <>
      <Dialog isOpen={isOpen} onClose={handleClose} paddingDialog="xs" title="" description="">
        <Column fillWidth>
          {!movieId ? null : isLoading ? (
            <Column fillWidth horizontal="center" vertical="center" style={{ minHeight: "320px" }}>
              <Spinner size="l" />
            </Column>
          ) : !movie ? (
            <Column fillWidth horizontal="center" vertical="center" style={{ minHeight: "320px" }}>
              <Text onBackground="neutral-weak">Movie not found.</Text>
            </Column>
          ) : (
            <>
              <MovieBackdrop
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
              />
              <MovieInfo movie={movie} />
              <Column fillWidth paddingX="32" paddingTop="20" paddingBottom="32" gap="20">
                <Text onBackground="neutral-weak" style={{ lineHeight: "1.75" }}>
                  {movie.overview}
                </Text>
                <MovieActions
                  inWatchlist={inWatchlist}
                  isFavourite={isFavourite}
                  showPlaylistPicker={showPlaylistPicker}
                  playlists={playlists}
                  isAdding={isAdding}
                  isAddedToPlaylist={isAddedToPlaylist}
                  onWatchlist={handleWatchlist}
                  onFavourite={handleFavourite}
                  onPlaylistButtonClick={handlePlaylistButtonClick}
                  onPlaylistSelect={handlePlaylistSelect}
                  onCreateNewPlaylist={() => {
                    setShowPlaylistPicker(false);
                    setShowCreateDialog(true);
                  }}
                />
              </Column>
            </>
          )}
        </Column>
      </Dialog>

      <CreatePlaylistDialog
        isOpen={showCreateDialog}
        movieTitle={movie?.title ?? ""}
        onClose={() => setShowCreateDialog(false)}
        onConfirm={handleCreateAndAdd}
      />
    </>
  );
};
