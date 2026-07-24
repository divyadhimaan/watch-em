"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Flex, Column, Button, Text, Heading } from "@once-ui/components";
import { VIBE_TAGS } from "./vibeMap";
import styles from "./VibePicker.module.scss";

type Props = {
  // When used inside WatchRoom, call this instead of navigating
  onSelect?: (vibeIds: string[]) => void;
  // Label for the CTA button
  ctaLabel?: string;
  // Max number of vibes that can be selected (default 2)
  maxSelect?: number;
};

export const VibePicker = ({
  onSelect,
  ctaLabel = "Find Something to Watch",
  maxSelect = 2,
}: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((v) => v !== id);
      if (prev.length >= maxSelect) return [...prev.slice(1), id]; // replace oldest
      return [...prev, id];
    });
  };

  const handleCta = () => {
    if (selected.length === 0) return;
    if (onSelect) {
      onSelect(selected);
      return;
    }
    const params = new URLSearchParams({ vibes: selected.join(",") });
    router.push(`/vibe?${params.toString()}`);
  };

  return (
    <Column gap="24" fillWidth>
      <Column gap="4">
        <Heading variant="display-default-s">What's the vibe?</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          Pick up to {maxSelect} — we'll find what fits.
        </Text>
      </Column>

      <div className={styles.grid}>
        {VIBE_TAGS.map((vibe) => {
          const isSelected = selected.includes(vibe.id);
          return (
            <button
              key={vibe.id}
              type="button"
              className={`${styles.vibeCard} ${isSelected ? styles.selected : ""}`}
              onClick={() => toggle(vibe.id)}
              aria-pressed={isSelected}
            >
              <span className={styles.emoji}>{vibe.emoji}</span>
              <span className={styles.label}>{vibe.label}</span>
              <span className={styles.desc}>{vibe.description}</span>
              {isSelected && <span className={styles.check}>✓</span>}
            </button>
          );
        })}
      </div>

      <Flex horizontal="center">
        <Button
          label={selected.length === 0 ? "Pick a vibe first" : ctaLabel}
          size="l"
          variant={selected.length === 0 ? "secondary" : "primary"}
          onClick={handleCta}
          disabled={selected.length === 0}
          suffixIcon="arrowRight"
        />
      </Flex>
    </Column>
  );
};