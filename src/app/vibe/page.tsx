"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Column,
  Flex,
  Heading,
  Text,
  Button,
  IconButton,
  Spinner,
  useToast,
} from "@once-ui/components";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { VibePicker } from "@/components/VibePicker";
import { moviesApi, seriesApi } from "../../../packages/store/catalogApi";
import { VIBE_TAGS, resolveVibeToSlug } from "@/components/VibePicker/vibeMap";
import type { TMDBMovie, TMDBSeries } from "../../../packages/store/types";
import { useAuth } from "@/context/AuthContext";
import { useAddFavourite } from "@/hooks/useProfile";
import { useWatchlist, type WatchlistItem } from "@/hooks/useWatchlist";
import styles from "./vibe.module.scss";

type MediaItem = TMDBMovie | TMDBSeries;

function getTitle(item: MediaItem): string {
  return item.media_type === "movie" ? item.title : item.name;
}

function getPoster(item: MediaItem): string {
  return item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : "/images/cover.jpg";
}

function getYear(item: MediaItem): string {
  const date =
    item.media_type === "movie" ? item.release_date : item.first_air_date;
  return date ? new Date(date).getFullYear().toString() : "";
}

export default function VibePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToast } = useToast();
  const { token } = useAuth();
  // Check the raw token rather than `isAuthenticated` (which also waits on the
  // profile fetch to resolve) — otherwise a swipe right after page load can
  // race that fetch and silently fall back to the "not signed in" path even
  // though the user is actually logged in.
  const isSignedIn = !!token;
  const addFavourite = useAddFavourite();
  const { add: addToWatchlist } = useWatchlist();
  const vibeIds = (searchParams?.get("vibes") ?? "").split(",").filter(Boolean);
  const roomMode = searchParams?.get("room") === "1";
  const hasVibes = vibeIds.length > 0;

  const selectedVibes = VIBE_TAGS.filter((v) => vibeIds.includes(v.id));
  const movieSlug = resolveVibeToSlug(vibeIds, "movie");
  const seriesSlug = resolveVibeToSlug(vibeIds, "series");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());
  const [saved, setSaved] = useState<MediaItem[]>([]);
  const [swipeDir, setSwipeDir] = useState<"left" | "right" | null>(null);
  const dragStartX = useRef<number | null>(null);
  const guestNudgeShown = useRef(false);

  // Reset the deck whenever the selected vibe changes (e.g. after "Change vibe").
  // movieSlug/seriesSlug are intentional re-trigger deps, not read in the body.
  // biome-ignore lint/correctness/useExhaustiveDependencies: movieSlug/seriesSlug are used to trigger the reset, not read inside it
  useEffect(() => {
    setCurrentIndex(0);
    setDismissed(new Set());
    setSaved([]);
    setSwipeDir(null);
  }, [movieSlug, seriesSlug]);

  const { data: movies = [], isLoading: moviesLoading } = useQuery({
    queryKey: ["vibe-movies", movieSlug],
    queryFn: () => moviesApi.getByFilter(movieSlug),
    enabled: hasVibes,
  });

  const { data: series = [], isLoading: seriesLoading } = useQuery({
    queryKey: ["vibe-series", seriesSlug],
    queryFn: () => seriesApi.getByFilter(seriesSlug),
    enabled: hasVibes,
  });

  // Interleave movies and series
  const safeMovies = movies ?? [];
const safeSeries = series ?? [];

const allItems: MediaItem[] = [];
const maxLen = Math.max(safeMovies.length, safeSeries.length);

for (let i = 0; i < maxLen; i++) {
  if (safeMovies[i]) allItems.push(safeMovies[i]);
  if (safeSeries[i]) allItems.push(safeSeries[i]);
}

  const visibleItems = allItems.filter((_, i) => !dismissed.has(i));
  const current = visibleItems[currentIndex];

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDir(direction);
    setTimeout(() => {
      if (direction === "right" && current) {
        setSaved((prev) => [...prev, current]);

        if (current.media_type === "movie") {
          if (isSignedIn) {
            addFavourite.mutate(current.id, {
              onSuccess: () =>
                addToast({
                  variant: "success",
                  message: `Saved "${getTitle(current)}" to your favourites.`,
                }),
              onError: () =>
                addToast({
                  variant: "danger",
                  message: "Couldn't save that to your favourites. Try again?",
                }),
            });
          } else if (!guestNudgeShown.current) {
            guestNudgeShown.current = true;
            addToast({
              variant: "success",
              message: "Saved for this session. Sign in to keep picks in your account.",
            });
          }
        }
      }
      setDismissed((prev) => new Set([...prev, allItems.indexOf(current)]));
      setCurrentIndex((prev) =>
        Math.min(prev, visibleItems.length - 2)
      );
      setSwipeDir(null);
    }, 300);
  };

  const isLoading = moviesLoading || seriesLoading;

  // ---- STEP: pick a vibe ----
  if (!hasVibes) {
    if (!isSignedIn) {
      return (
        <Column fillWidth paddingY="80" paddingX="s" horizontal="center" flex={1}>
          <Header />
          <Column as="main" maxWidth="s" fillWidth horizontal="center" vertical="center" gap="24" paddingY="80">
            <Text variant="display-default-s" align="center">🎬</Text>
            <Column gap="8" horizontal="center">
              <Heading variant="display-default-xs" align="center">Pick your vibe</Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Sign in to discover movies and shows that match your mood.
              </Text>
            </Column>
            <Button
              label="Sign in"
              variant="primary"
              prefixIcon="person"
              href="/signin"
              size="l"
            />
          </Column>
          <Footer />
        </Column>
      );
    }

    return (
      <Column fillWidth paddingY="80" paddingX="s" horizontal="center" flex={1}>
        <Header />
        <Column as="main" maxWidth="m" fillWidth horizontal="center" paddingY="32">
          <VibePicker maxSelect={2} />
        </Column>
        <Footer />
      </Column>
    );
  }

  return (
    <Column fillWidth paddingY="80" paddingX="s" horizontal="center" flex={1}>
      <Header />
      <Column
        as="main"
        maxWidth="xl"
        fillWidth
        horizontal="center"
        gap="32"
        paddingY="32"
      >
        {/* Vibe header */}
        <Column gap="8" horizontal="center">
          <Flex gap="8" wrap horizontal="center">
            {selectedVibes.map((v) => (
              <span key={v.id} className={styles.vibeBadge}>
                {v.emoji} {v.label}
              </span>
            ))}
          </Flex>
          <Text variant="body-default-m" onBackground="neutral-weak">
            {saved.length > 0
              ? `${saved.length} saved · swipe right to save more`
              : "Swipe right to save · left to skip"}
          </Text>
        </Column>

        {isLoading ? (
          <Flex horizontal="center" paddingY="80">
            <Spinner size="l" />
          </Flex>
        ) : visibleItems.length === 0 || currentIndex >= visibleItems.length ? (
          <Column horizontal="center" gap="16" paddingY="48">
            <Text variant="heading-default-m">That's all for this vibe</Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              {saved.length} saved • try a different vibe?
            </Text>
            <Flex gap="12">
              <Button
                label="Change vibe"
                variant="secondary"
                onClick={() => router.push("/vibe")}
              />
              {roomMode && saved.length > 0 && (
                <Button
                  label="Add to room"
                  variant="primary"
                  suffixIcon="arrowRight"
                  onClick={() => {
                    // Store saved picks in sessionStorage for room to read
                    sessionStorage.setItem(
                      "vibePicks",
                      JSON.stringify(saved.map((m) => m.id))
                    );
                    router.back();
                  }}
                />
              )}
            </Flex>
          </Column>
        ) : (
          <Column horizontal="center" gap="24" fillWidth>
            {/* Card stack */}
            <div className={styles.cardStack}>
              {/* Next card preview */}
              {visibleItems[currentIndex + 1] && (
                <div className={`${styles.card} ${styles.cardBehind}`}>
                  <img
                    src={getPoster(visibleItems[currentIndex + 1])}
                    alt=""
                    className={styles.poster}
                  />
                </div>
              )}
              {/* Current card */}
              {current && (
                <div
                  className={`${styles.card} ${
                    swipeDir === "right"
                      ? styles.swipeRight
                      : swipeDir === "left"
                      ? styles.swipeLeft
                      : ""
                  }`}
                  onMouseDown={(e) => { dragStartX.current = e.clientX; }}
                  onMouseUp={(e) => {
                    if (dragStartX.current !== null) {
                      const delta = e.clientX - dragStartX.current;
                      if (Math.abs(delta) > 60)
                        handleSwipe(delta > 0 ? "right" : "left");
                    }
                    dragStartX.current = null;
                  }}
                  onTouchStart={(e) => { dragStartX.current = e.touches[0].clientX; }}
                  onTouchEnd={(e) => {
                    if (dragStartX.current !== null) {
                      const delta =
                        e.changedTouches[0].clientX - dragStartX.current;
                      if (Math.abs(delta) > 60)
                        handleSwipe(delta > 0 ? "right" : "left");
                    }
                    dragStartX.current = null;
                  }}
                >
                  <img
                    src={getPoster(current)}
                    alt={getTitle(current)}
                    className={styles.poster}
                    draggable={false}
                  />
                  <div className={styles.cardInfo}>
                    <span className={styles.mediaType}>
                      {current.media_type === "movie" ? "🎬 Movie" : "📺 Series"}
                    </span>
                    <Heading variant="display-default-xs">
                      {getTitle(current)}
                    </Heading>
                    <Flex gap="8" vertical="center">
                      <Text variant="body-default-s" onBackground="neutral-weak">
                        {getYear(current)}
                      </Text>
                      <Text variant="body-default-s" onBackground="neutral-weak">
                        ⭐ {current.vote_average.toFixed(1)}
                      </Text>
                    </Flex>
                    <Text
                      variant="body-default-s"
                      onBackground="neutral-weak"
                      className={styles.overview}
                    >
                      {current.overview?.slice(0, 120)}
                      {(current.overview?.length ?? 0) > 120 ? "…" : ""}
                    </Text>
                  </div>

                  {/* Swipe hint overlays */}
                  {swipeDir === "right" && (
                    <div className={`${styles.swipeHint} ${styles.hintSave}`}>
                      SAVE
                    </div>
                  )}
                  {swipeDir === "left" && (
                    <div className={`${styles.swipeHint} ${styles.hintSkip}`}>
                      SKIP
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <Flex gap="24" horizontal="center" vertical="center">
              <IconButton
                icon="close"
                size="l"
                variant="secondary"
                onClick={() => handleSwipe("left")}
                tooltip="Skip"
              />
              <Text
                variant="body-default-s"
                onBackground="neutral-weak"
              >{`${dismissed.size + 1} / ${allItems.length}`}</Text>
              <IconButton
                icon="heart"
                size="l"
                variant="primary"
                onClick={() => handleSwipe("right")}
                tooltip="Save"
              />
            </Flex>

            {/* Saved strip — compact horizontal row just below the buttons */}
            {saved.length > 0 && (
              <Column gap="8" horizontal="center" fillWidth style={{ maxWidth: 400 }}>
                <Flex horizontal="space-between" vertical="center" fillWidth>
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    {saved.length} saved
                  </Text>
                  <Button
                    label="Add to watchlist"
                    variant="secondary"
                    size="s"
                    prefixIcon="bookmark"
                    onClick={() => {
                      const watchlistItems: WatchlistItem[] = saved.map((item) => ({
                        id: item.id,
                        title: (item as TMDBMovie).title || (item as TMDBSeries).name || "Unknown",
                        poster_path: item.poster_path ?? null,
                        release_date: (item as TMDBMovie).release_date || (item as TMDBSeries).first_air_date,
                        vote_average: item.vote_average,
                        media_type: item.media_type === "movie" ? "movie" : "series",
                        vibes: selectedVibes.map((v) => ({ emoji: v.emoji, label: v.label })),
                      }));
                      addToWatchlist(watchlistItems);
                      router.push("/profile?tab=watchlist");
                    }}
                  />
                </Flex>
                <div className={styles.savedStrip}>
                  {[...saved].reverse().map((item) => (
                    <div key={item.id} className={styles.savedStripItem} title={getTitle(item)}>
                      <img
                        src={getPoster(item)}
                        alt={getTitle(item)}
                        className={styles.savedStripPoster}
                      />
                    </div>
                  ))}
                </div>
              </Column>
            )}
          </Column>
        )}
      </Column>
      <Footer />
    </Column>
  );
}