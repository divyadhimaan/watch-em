"use client";

import {
  Dialog,
  Column,
  Row,
  Text,
  Heading,
  Badge,
  Button,
  Spinner,
  useToast,
} from "@once-ui/components";
import { notFound } from "next/navigation";
import { useMovieDetails } from "./../../hooks/useMovies";
import { getImageUrl } from "@/utils/getImageUrl";
import { useSearchParams, useRouter } from "next/navigation";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useAddFavourite, useRemoveFavourite, useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/context/AuthContext";
import styles from "./DetailDialog.module.scss";

function formatRuntime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m > 0 ? `${m}m` : ""}`.trim() : `${m}m`;
}

export const DetailDialog = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToast } = useToast();
  const { isAuthenticated } = useAuth();

  const movieParam = searchParams?.get("movie");
  const movieId = movieParam ? Number(movieParam) : null;
  const isOpen = !!movieId;

  if (movieParam && Number.isNaN(movieId)) return notFound();

  const { data: movie, isLoading } = useMovieDetails(movieId ?? 0);
  const { items: watchlistItems, add: addToWatchlist } = useWatchlist();
  const { data: profileData } = useProfile();
  const addFavourite = useAddFavourite();
  const removeFavourite = useRemoveFavourite();

  const handleClose = () => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete("movie");
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : window.location.pathname, { scroll: false });
  };

  const inWatchlist = movie ? watchlistItems.some((i) => i.id === movie.id) : false;
  const isFavourite = movie
    ? (profileData?.favouriteMovieIds ?? []).includes(movie.id)
    : false;

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
    if (isFavourite) {
      removeFavourite.mutate(movie.id);
    } else {
      addFavourite.mutate(movie.id);
    }
  };

  const year = movie?.release_date ? new Date(movie.release_date).getFullYear() : null;

  // Always render the Dialog so once-ui can animate closed and release
  // the body scroll lock. Returning null skips isOpen=false and freezes the page.
  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      paddingDialog="xs"
      title=""
      description=""
    >
      <Column fillWidth>
        {!movieId ? null : isLoading ? (
          <Column
            fillWidth
            horizontal="center"
            vertical="center"
            style={{ minHeight: "320px" }}
          >
            <Spinner size="l" />
          </Column>
        ) : !movie ? (
          <Column fillWidth horizontal="center" vertical="center" style={{ minHeight: "320px" }}>
            <Text onBackground="neutral-weak">Movie not found.</Text>
          </Column>
        ) : (
          <>
            {/* Backdrop */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/7",
                overflow: "hidden",
                borderRadius: "var(--radius-l)",
                flexShrink: 0,
              }}
            >
              <img
                src={getImageUrl(movie.backdrop_path || movie.poster_path, "w1280")}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, var(--page-background) 100%)",
                }}
              />
            </div>

            {/* Poster + info grid */}
            <div className={styles.detailGrid}>
              {/* Poster overlapping the backdrop */}
              <div className={styles.poster}>
                <img
                  src={getImageUrl(movie.poster_path, "w342")}
                  alt={movie.title}
                />
              </div>

              {/* Info */}
              <Column gap="12" paddingTop="8">
                <Column gap="4">
                  <Heading as="h2" variant="display-default-s">
                    {movie.title}
                  </Heading>
                  {movie.tagline ? (
                    <Text onBackground="neutral-weak" style={{ fontStyle: "italic" }}>
                      "{movie.tagline}"
                    </Text>
                  ) : null}
                </Column>

                {/* Meta: year · runtime · rating */}
                <div className={styles.metaRow}>
                  {year && <span>{year}</span>}
                  {movie.runtime > 0 && (
                    <>
                      <span className={styles.dot}>·</span>
                      <span>{formatRuntime(movie.runtime)}</span>
                    </>
                  )}
                  <span className={styles.dot}>·</span>
                  <span>⭐ {movie.vote_average.toFixed(1)}</span>
                  <span className={styles.dot}>·</span>
                  <span>{movie.vote_count.toLocaleString()} votes</span>
                </div>

                {/* Genres */}
                <Row gap="8" wrap>
                  {movie.genres.map((g) => (
                    <Badge
                      key={g.id}
                      title={g.name}
                      arrow={false}
                      effect={false}
                      paddingX="12"
                      paddingY="8"
                      background="brand-weak"
                      border="brand-strong"
                    />
                  ))}
                </Row>
              </Column>
            </div>

            {/* Overview + actions */}
            <Column
              fillWidth
              paddingX="32"
              paddingTop="20"
              paddingBottom="32"
              gap="20"
            >
              <Text
                onBackground="neutral-weak"
                style={{ lineHeight: "1.75" }}
              >
                {movie.overview}
              </Text>

              <div className={styles.actions}>
                <Button
                  variant={inWatchlist ? "secondary" : "primary"}
                  prefixIcon={inWatchlist ? "check" : "plus"}
                  onClick={handleWatchlist}
                >
                  {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
                </Button>
                <Button
                  variant={isFavourite ? "primary" : "secondary"}
                  prefixIcon="star"
                  onClick={handleFavourite}
                >
                  {isFavourite ? "Favourited" : "Favourite"}
                </Button>
                <Button
                  variant="secondary"
                  prefixIcon="plus"
                  onClick={() =>
                    addToast({ variant: "danger", message: "Playlists coming soon." })
                  }
                >
                  Add to Playlist
                </Button>
              </div>
            </Column>
          </>
        )}
      </Column>
    </Dialog>
  );
};
