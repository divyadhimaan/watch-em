'use client';

import { Column, Row, Text, Heading, Button, IconButton } from "@once-ui/components";
import { useWatchlist } from "@/hooks/useWatchlist";
import { getImageUrl } from "@/utils/getImageUrl";
import styles from "./WatchlistTab.module.scss";

export function WatchlistTab() {
  const { items, remove, toggleWatched } = useWatchlist();

  if (items.length === 0) {
    return (
      <Column fillWidth gap="12" paddingY="32" horizontal="center">
        <Heading as="h4" variant="heading-default-m">Your watchlist is empty</Heading>
        <Text onBackground="neutral-weak" align="center">
          Save picks from the Vibe page to build your watchlist.
        </Text>
        <Button href="/vibe" variant="primary" prefixIcon="sparkle">
          Find your vibe
        </Button>
      </Column>
    );
  }

  const unwatched = items.filter((i) => !i.watched);
  const done = items.filter((i) => i.watched);

  return (
    <Column fillWidth gap="24">
      {/* Header */}
      <Row horizontal="space-between" vertical="center">
        <Column gap="2">
          <Heading as="h4" variant="heading-default-m">My Watchlist</Heading>
          <Text size="s" onBackground="neutral-weak">
            {unwatched.length} to watch · {done.length} watched
          </Text>
        </Column>
        <Button href="/vibe" variant="secondary" prefixIcon="sparkle" size="s">
          Add more
        </Button>
      </Row>

      {/* To watch */}
      {unwatched.length > 0 && (
        <Column fillWidth gap="8">
          {done.length > 0 && (
            <Text size="xs" onBackground="neutral-weak" style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
              Up next
            </Text>
          )}
          <Column fillWidth gap="8">
            {unwatched.map((item) => (
              <div key={item.id} className={styles.card}>
                <div className={styles.posterWrap}>
                  <img
                    src={item.poster_path ? getImageUrl(item.poster_path, "w185") : "/images/cover.jpg"}
                    alt={item.title}
                    className={styles.poster}
                  />
                </div>

                <div className={styles.info}>
                  <div className={styles.titleRow}>
                    <Text weight="strong" size="m" className={styles.title}>{item.title}</Text>
                    {item.vibes?.map((v) => (
                      <span key={v.label} className={styles.vibeBadge}>
                        {v.emoji} {v.label}
                      </span>
                    ))}
                  </div>
                  <Text size="s" onBackground="neutral-weak">
                    {item.release_date ? new Date(item.release_date).getFullYear() : "—"}
                    {item.vote_average ? ` · ⭐ ${item.vote_average.toFixed(1)}` : ""}
                  </Text>
                </div>

                <div className={styles.actions}>
                  <IconButton
                    icon="check"
                    size="s"
                    variant="secondary"
                    tooltip="Mark as watched"
                    onClick={() => toggleWatched(item.id)}
                  />
                  <IconButton
                    icon="close"
                    size="s"
                    variant="ghost"
                    tooltip="Remove"
                    onClick={() => remove(item.id)}
                  />
                </div>
              </div>
            ))}
          </Column>
        </Column>
      )}

      {/* Watched */}
      {done.length > 0 && (
        <Column fillWidth gap="8">
          <Text size="xs" onBackground="neutral-weak" style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
            Watched
          </Text>
          <Column fillWidth gap="8">
            {done.map((item) => (
              <div key={item.id} className={`${styles.card} ${styles.cardWatched}`}>
                <div className={styles.posterWrap}>
                  <img
                    src={item.poster_path ? getImageUrl(item.poster_path, "w185") : "/images/cover.jpg"}
                    alt={item.title}
                    className={styles.poster}
                  />
                  <div className={styles.watchedOverlay}>✓</div>
                </div>

                <div className={styles.info}>
                  <div className={styles.titleRow}>
                    <Text weight="strong" size="m" className={`${styles.title} ${styles.titleMuted}`}>{item.title}</Text>
                    {item.vibes?.map((v) => (
                      <span key={v.label} className={styles.vibeBadge}>
                        {v.emoji} {v.label}
                      </span>
                    ))}
                  </div>
                  <Text size="s" onBackground="neutral-weak">
                    {item.release_date ? new Date(item.release_date).getFullYear() : "—"}
                    {item.vote_average ? ` · ⭐ ${item.vote_average.toFixed(1)}` : ""}
                  </Text>
                </div>

                <div className={styles.actions}>
                  <IconButton
                    icon="refresh"
                    size="s"
                    variant="ghost"
                    tooltip="Unmark"
                    onClick={() => toggleWatched(item.id)}
                  />
                  <IconButton
                    icon="close"
                    size="s"
                    variant="ghost"
                    tooltip="Remove"
                    onClick={() => remove(item.id)}
                  />
                </div>
              </div>
            ))}
          </Column>
        </Column>
      )}
    </Column>
  );
}
