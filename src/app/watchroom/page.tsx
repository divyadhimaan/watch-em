"use client";

import { Column, Heading, Text } from "@once-ui/components";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

export default function WatchRoomLandingPage() {
  return (
    <Column fillWidth flex={1} style={{ minHeight: "100vh" }}>
      <Header />
      <Column fillWidth flex={1} horizontal="center" vertical="center" gap="16" style={{ minHeight: "60vh" }}>
        <span style={{ fontSize: "3rem" }}>🍿</span>
        <Heading variant="display-default-m" align="center">Watch Room</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" align="center">
          Coming soon — watch together with friends in real time.
        </Text>
      </Column>
      <Footer />
    </Column>
  );
}

/*
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Column, Flex, Heading, Text, Button, Input } from "@once-ui/components";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import {
  generateRoomId,
  saveRoomToStorage,
  type WatchRoom,
} from "@app-types/watchroomTypes";
import styles from "./watchroom.module.scss";

export default function WatchRoomLandingPage() {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState("");
  const [joinError, setJoinError] = useState("");

  const handleCreate = () => {
    const id = generateRoomId();
    const room: WatchRoom = {
      id,
      createdAt: Date.now(),
      participants: [],
    };
    saveRoomToStorage(room);
    router.push(`/watchroom/${id}`);
  };

  const handleJoin = () => {
    const code = joinCode.trim().toUpperCase();
    if (code.length < 4) {
      setJoinError("Enter a valid room code");
      return;
    }
    router.push(`/watchroom/${code}`);
  };

  return (
    <Column fillWidth paddingY="80" paddingX="s" horizontal="center" flex={1}>
      <Header />
      <Column as="main" maxWidth="s" fillWidth horizontal="center" gap="48" paddingY="48">
        <Column gap="12" horizontal="center">
          <span className={styles.heroEmoji}>🍿</span>
          <Heading variant="display-default-m" align="center">Watch together</Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center">
            Create a room, invite your group. Everyone picks their vibe and
            streaming services — Watchem finds what works for everyone.
          </Text>
        </Column>
        <div className={styles.steps}>
          {[
            { n: "1", text: "Create a room & share the link" },
            { n: "2", text: "Everyone picks their vibe + OTT services" },
            { n: "3", text: "Watchem finds the overlap" },
          ].map((step) => (
            <div key={step.n} className={styles.step}>
              <span className={styles.stepNum}>{step.n}</span>
              <Text variant="body-default-m">{step.text}</Text>
            </div>
          ))}
        </div>
        <Column gap="24" fillWidth>
          <Button
            label="Create a Room"
            size="l"
            variant="primary"
            fillWidth
            prefixIcon="plus"
            onClick={handleCreate}
          />
          <Flex vertical="center" gap="16" fillWidth>
            <div className={styles.dividerLine} />
            <Text variant="label-default-s" onBackground="neutral-weak" style={{ whiteSpace: "nowrap" }}>
              or join existing
            </Text>
            <div className={styles.dividerLine} />
          </Flex>
          <Flex gap="12" fillWidth>
            <Input
              id="join-code"
              label="Room code"
              value={joinCode}
              onChange={(e) => {
                setJoinCode(e.target.value.toUpperCase());
                setJoinError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              style={{ flex: 1, textTransform: "uppercase", letterSpacing: "0.15em" }}
            />
            <Button label="Join" size="m" variant="secondary" onClick={handleJoin} />
          </Flex>
        </Column>
      </Column>
      <Footer />
    </Column>
  );
}
*/
