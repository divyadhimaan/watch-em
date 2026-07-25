"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Column,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  Spinner,
  Tag,
} from "@once-ui/components";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Pill } from "@/components/Pill";
import { VibePicker } from "@/components/VibePicker";
import {
  OTT_PLATFORMS,
  type RoomParticipant,
  type WatchRoom,
  saveRoomToStorage,
  getRoomFromStorage,
  getSharedOTTs,
  getMergedVibes,
} from "@app-types/watchroomTypes";
import { moviesApi, seriesApi } from "../../../../packages/store/catalogApi";
import { VIBE_TAGS, resolveVibeToSlug } from "@/components/VibePicker/vibeMap";
import type { TMDBMovie, TMDBSeries } from "../../../../packages/store/types";
import styles from "../watchroom.module.scss";

type Step = "name" | "vibes" | "ott" | "waiting" | "results";

function getTitle(item: TMDBMovie | TMDBSeries) {
  return item.media_type === "movie" ? item.title : item.name;
}
function getPoster(item: TMDBMovie | TMDBSeries) {
  return item.poster_path
    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
    : "/images/cover.jpg";
}

export default function WatchRoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = (params?.roomId as string)?.toUpperCase();

  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedOTTs, setSelectedOTTs] = useState<string[]>([]);
  const [room, setRoom] = useState<WatchRoom | null>(null);
  const [copied, setCopied] = useState(false);

  // Load room from storage on mount
  useEffect(() => {
    const stored = getRoomFromStorage(roomId);
    if (stored) {
      setRoom(stored);
    } else {
      // First time visiting this room ID — create it
      const newRoom: WatchRoom = {
        id: roomId,
        createdAt: Date.now(),
        participants: [],
      };
      saveRoomToStorage(newRoom);
      setRoom(newRoom);
    }
  }, [roomId]);

  const handleNameSubmit = () => {
    if (!name.trim()) {
      setNameError("Enter your name");
      return;
    }
    setStep("vibes");
  };

  const handleVibesSelected = (vibeIds: string[]) => {
    setSelectedVibes(vibeIds);
    setStep("ott");
  };

  const handleOTTToggle = (id: string) => {
    setSelectedOTTs((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const handleJoinRoom = () => {
    if (!room) return;
    const me: RoomParticipant = {
      name: name.trim(),
      vibeIds: selectedVibes,
      ottIds: selectedOTTs,
    };
    const updated: WatchRoom = {
      ...room,
      participants: [
        ...room.participants.filter((p) => p.name !== me.name),
        me,
      ],
    };
    saveRoomToStorage(updated);
    setRoom(updated);
    setStep("results");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ---- Results logic ----
  const sharedOTTs = room ? getSharedOTTs(room.participants, 1) : [];
  const mergedVibes = room ? getMergedVibes(room.participants) : [];
  const movieSlug = resolveVibeToSlug(mergedVibes, "movie");
  const seriesSlug = resolveVibeToSlug(mergedVibes, "series");

  const { data: movies = [], isLoading: ml } = useQuery({
    queryKey: ["room-movies", movieSlug],
    queryFn: () => moviesApi.getByFilter(movieSlug),
    enabled: step === "results",
  });

  const { data: series = [], isLoading: sl } = useQuery({
    queryKey: ["room-series", seriesSlug],
    queryFn: () => seriesApi.getByFilter(seriesSlug),
    enabled: step === "results",
  });

  const allItems = [...movies.slice(0, 10), ...series.slice(0, 10)];

  return (
    <Column fillWidth paddingY="80" paddingX="s" horizontal="center" flex={1}>
      <Header />
      <Column
        as="main"
        maxWidth="m"
        fillWidth
        horizontal="center"
        gap="32"
        paddingY="32"
      >
        {/* Room header */}
        <Flex fillWidth horizontal="space-between" vertical="center" wrap gap="12">
          <Column gap="4">
            <Flex gap="8" vertical="center">
              <Text variant="label-default-s" onBackground="neutral-weak">
                Room
              </Text>
              <Text variant="label-default-s" onBackground="brand-weak">
                {roomId}
              </Text>
            </Flex>
            {room && room.participants.length > 0 && (
              <Text variant="body-default-s" onBackground="neutral-weak">
                {room.participants.map((p) => p.name).join(", ")} in here
              </Text>
            )}
          </Column>
          <Button
            label={copied ? "Copied!" : "Share room link"}
            size="s"
            variant="secondary"
            prefixIcon="link"
            onClick={handleCopyLink}
          />
        </Flex>

        {/* ---- STEP: Name ---- */}
        {step === "name" && (
          <Column gap="24" fillWidth>
            <Heading variant="display-default-s">Who are you?</Heading>
            <Flex gap="12" fillWidth>
              <Input
                id="room-name"
                label="Your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                // error={nameError || undefined}
                style={{ flex: 1 }}
              />
              <Button
                label="Next"
                variant="primary"
                onClick={handleNameSubmit}
                suffixIcon="arrowRight"
              />
            </Flex>
            {room && room.participants.length > 0 && (
              <Column gap="8">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Already joined
                </Text>
                <Flex gap="8" wrap>
                  {room.participants.map((p) => (
                    <Tag key={p.name} label={p.name} size="m" />
                  ))}
                </Flex>
              </Column>
            )}
          </Column>
        )}

        {/* ---- STEP: Vibes ---- */}
        {step === "vibes" && (
          <VibePicker
            onSelect={handleVibesSelected}
            ctaLabel="Next: Pick your services"
            maxSelect={2}
          />
        )}

        {/* ---- STEP: OTT ---- */}
        {step === "ott" && (
          <Column gap="24" fillWidth>
            <Column gap="4">
              <Heading variant="display-default-s">Your streaming services</Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Select all you have access to.
              </Text>
            </Column>
            <div className={styles.ottGrid}>
              {OTT_PLATFORMS.map((ott) => {
                const isSelected = selectedOTTs.includes(ott.id);
                return (
                  <button
                    key={ott.id}
                    type="button"
                    className={`${styles.ottCard} ${isSelected ? styles.ottSelected : ""}`}
                    style={
                      isSelected
                        ? { borderColor: ott.color, background: `${ott.color}18` }
                        : {}
                    }
                    onClick={() => handleOTTToggle(ott.id)}
                    aria-pressed={isSelected}
                  >
                    <span
                      className={styles.ottLogo}
                      style={{ background: ott.color }}
                    >
                      {ott.logo}
                    </span>
                    <Text variant="body-strong-s">{ott.label}</Text>
                    {isSelected && (
                      <span className={styles.ottCheck}>✓</span>
                    )}
                  </button>
                );
              })}
            </div>
            <Button
              label={
                selectedOTTs.length === 0
                  ? "Skip (show all)"
                  : `Join room with ${selectedOTTs.length} service${selectedOTTs.length > 1 ? "s" : ""}`
              }
              size="l"
              variant="primary"
              fillWidth
              onClick={handleJoinRoom}
              suffixIcon="arrowRight"
            />
          </Column>
        )}

        {/* ---- STEP: Results ---- */}
        {step === "results" && (
          <Column gap="32" fillWidth>
            {/* Participants summary */}
            {room && (
              <div className={styles.participantsSummary}>
                <Text variant="label-default-m">In the room</Text>
                <Flex gap="12" wrap paddingTop="8">
                  {room.participants.map((p) => (
                    <div key={p.name} className={styles.participantCard}>
                      <Text variant="body-strong-s">{p.name}</Text>
                      <Flex gap="4" wrap>
                        {p.vibeIds.map((v) => {
                          const vibe = VIBE_TAGS.find((t) => t.id === v);
                          return vibe ? (
                            <span key={v} className={styles.miniVibe}>
                              {vibe.emoji}
                            </span>
                          ) : null;
                        })}
                      </Flex>
                      <Flex gap="4" wrap>
                        {p.ottIds.map((o) => {
                          const ott = OTT_PLATFORMS.find((t) => t.id === o);
                          return ott ? (
                            <span
                              key={o}
                              className={styles.miniOtt}
                              style={{ background: ott.color }}
                            >
                              {ott.logo}
                            </span>
                          ) : null;
                        })}
                      </Flex>
                    </div>
                  ))}
                </Flex>
              </div>
            )}

            {/* Shared vibes */}
            <Column gap="8">
              <Text variant="label-default-m">Group vibe</Text>
              <Flex gap="8">
                {mergedVibes.map((id) => {
                  const vibe = VIBE_TAGS.find((v) => v.id === id);
                  return vibe ? (
                    <Pill key={id} variant="vibe" size="m">
                      {vibe.emoji} {vibe.label}
                    </Pill>
                  ) : null;
                })}
              </Flex>
            </Column>

            {/* Results grid */}
            {ml || sl ? (
              <Flex horizontal="center" paddingY="48">
                <Spinner size="l" />
              </Flex>
            ) : (
              <Column gap="16">
                <Heading variant="heading-default-m">Watch together</Heading>
                <div className={styles.resultsGrid}>
                  {allItems.slice(0, 12).map((item) => (
                    <div key={item.id} className={styles.resultCard}>
                      <img
                        src={getPoster(item)}
                        alt={getTitle(item)}
                        className={styles.resultPoster}
                      />
                      <div className={styles.resultInfo}>
                        <Text variant="body-strong-xs">{getTitle(item)}</Text>
                        <Text
                          variant="body-default-xs"
                          onBackground="neutral-weak"
                        >
                          ⭐ {item.vote_average.toFixed(1)}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              </Column>
            )}

            {/* Invite more */}
            <Column
              gap="12"
              padding="20"
              radius="l"
              border="neutral-alpha-weak"
              background="neutral-alpha-weak"
            >
              <Text variant="body-strong-m">Invite more people</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Share the room code or link — they pick their services and the
                results update.
              </Text>
              <Flex gap="12">
                <Text
                  variant="label-default-l"
                  className={styles.roomCode}
                >
                  {roomId}
                </Text>
                <Button
                  label={copied ? "Copied!" : "Copy link"}
                  size="s"
                  variant="secondary"
                  prefixIcon="link"
                  onClick={handleCopyLink}
                />
              </Flex>
            </Column>
          </Column>
        )}
      </Column>
      <Footer />
    </Column>
  );
}