'use client';

import {
  Column,
  Row,
  Text,
  Heading,
  Button,
  Card,
  SmartImage,
  Spinner,
  IconButton,
} from "@once-ui/components";
import { useProfile, useRemoveFavourite } from "@/hooks/useProfile";
import { useMoviesByIds } from "@/hooks/useMovies";
import { getImageUrl } from "@/utils/getImageUrl";

export function FavouritesTab() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const favouriteIds = profile?.favouriteMovieIds ?? [];
  const results = useMoviesByIds(favouriteIds);
  const removeFavourite = useRemoveFavourite();

  const isLoading = profileLoading || results.some((r) => r.isLoading);
  const movies = results.map((r) => r.data).filter(Boolean);

  if (isLoading) {
    return (
      <Row horizontal="center" paddingY="48">
        <Spinner size="l" />
      </Row>
    );
  }

  if (favouriteIds.length === 0) {
    return (
      <Column fillWidth gap="12" paddingY="32" horizontal="center">
        <Heading as="h4" variant="heading-default-m">
          No favourites yet
        </Heading>
        <Text onBackground="neutral-weak" align="center">
          Swipe right on a movie in Vibe to save it here.
        </Text>
        <Button href="/vibe" variant="primary" prefixIcon="sparkle">
          Find your vibe
        </Button>
      </Column>
    );
  }

  return (
    <Column fillWidth gap="16">
      <Row horizontal="space-between" vertical="center">
        <Heading as="h4" variant="heading-default-m">
          My Favourites
        </Heading>
        <Text size="s" onBackground="neutral-weak">
          {movies.length} movie{movies.length === 1 ? "" : "s"}
        </Text>
      </Row>

      <Column fillWidth gap="12">
        {movies.map((movie) => (
          <Card key={movie!.id} padding="0" radius="l" overflow="hidden" fillWidth>
            <Row gap="0" fillWidth>
              <SmartImage
                src={getImageUrl(movie!.poster_path, "w185")}
                alt={movie!.title}
                aspectRatio="2/3"
                style={{
                  width: "100px",
                  height: "auto",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <Row
                padding="16"
                gap="12"
                fillWidth
                vertical="center"
                horizontal="space-between"
                style={{ flex: "1" }}
              >
                <Column gap="4">
                  <Text weight="strong" size="m">
                    {movie!.title}
                  </Text>
                  <Text size="s" onBackground="neutral-weak">
                    {movie!.release_date
                      ? new Date(movie!.release_date).getFullYear()
                      : "—"}{" "}
                    · ⭐ {movie!.vote_average?.toFixed?.(1) ?? "N/A"}
                  </Text>
                </Column>
                <IconButton
                  icon="close"
                  size="s"
                  variant="secondary"
                  tooltip="Remove"
                  onClick={() => removeFavourite.mutate(movie!.id)}
                />
              </Row>
            </Row>
          </Card>
        ))}
      </Column>
    </Column>
  );
}
