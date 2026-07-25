'use client';

import { Column, Row, Text, Heading, Button, IconButton } from "@once-ui/components";
import { useWatchlist } from "@/hooks/useWatchlist";
import { MediaListItem } from "./MediaListItem";
import { Pill } from "@/components/Pill";

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

  const sectionLabel = (label: string) => (
    <Text
      size="xs"
      onBackground="neutral-weak"
      style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}
    >
      {label}
    </Text>
  );

  return (
    <Column fillWidth gap="24">
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

      {unwatched.length > 0 && (
        <Column fillWidth gap="8">
          {done.length > 0 && sectionLabel("Up next")}
          {unwatched.map((item) => (
            <MediaListItem
              key={item.id}
              poster={item.poster_path}
              title={item.title}
              year={item.release_date ? new Date(item.release_date).getFullYear() : null}
              rating={item.vote_average}
              badges={item.vibes?.map((v) => (
                <Pill key={v.label} variant="vibe" size="m">
                  {v.emoji} {v.label}
                </Pill>
              ))}
              actions={
                <>
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
                </>
              }
            />
          ))}
        </Column>
      )}

      {done.length > 0 && (
        <Column fillWidth gap="8">
          {sectionLabel("Watched")}
          {done.map((item) => (
            <MediaListItem
              key={item.id}
              poster={item.poster_path}
              title={item.title}
              year={item.release_date ? new Date(item.release_date).getFullYear() : null}
              rating={item.vote_average}
              watched
              badges={item.vibes?.map((v) => (
                <Pill key={v.label} variant="vibe" size="m">
                  {v.emoji} {v.label}
                </Pill>
              ))}
              actions={
                <>
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
                </>
              }
            />
          ))}
        </Column>
      )}
    </Column>
  );
}
