"use client";

import { Column, Heading, Text, Button } from "@once-ui/components";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

export default function WatchRoomPage() {
  return (
    <Column fillWidth flex={1} style={{ minHeight: "100vh" }}>
      <Header />
      <Column fillWidth flex={1} horizontal="center" vertical="center" gap="16" style={{ minHeight: "60vh" }}>
        <span style={{ fontSize: "3rem" }}>🍿</span>
        <Heading variant="display-default-m" align="center">Watch Room</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" align="center">
          Coming soon — watch together with friends in real time.
        </Text>
        <Button href="/watchroom" variant="secondary" label="Go back" />
      </Column>
      <Footer />
    </Column>
  );
}

/*
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

  useEffect(() => {
    const stored = getRoomFromStorage(roomId);
    if (stored) {
      setRoom(stored);
    } else {
      const newRoom: WatchRoom = { id: roomId, createdAt: Date.now(), participants: [] };
      saveRoomToStorage(newRoom);
      setRoom(newRoom);
    }
  }, [roomId]);

  const handleNameSubmit = () => {
    if (!name.trim()) { setNameError("Enter your name"); return; }
    setStep("vibes");
  };

  const handleVibesSelected = (vibeIds: string[]) => {
    setSelectedVibes(vibeIds);
    setStep("ott");
  };

  const handleOTTToggle = (id: string) => {
    setSelectedOTTs((prev) => prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]);
  };

  const handleJoinRoom = () => {
    if (!room) return;
    const me: RoomParticipant = { name: name.trim(), vibeIds: selectedVibes, ottIds: selectedOTTs };
    const updated: WatchRoom = { ...room, participants: [...room.participants.filter((p) => p.name !== me.name), me] };
    saveRoomToStorage(updated);
    setRoom(updated);
    setStep("results");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    // ... full JSX removed for brevity — see git history
  );
}
*/
