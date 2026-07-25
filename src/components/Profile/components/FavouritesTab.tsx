'use client';

import { Column, Row, Text, Heading, Button, IconButton, Spinner } from "@once-ui/components";
import { useProfile, useRemoveFavourite } from "@/hooks/useProfile";
import { useMoviesByIds } from "@/hooks/useMovies";
import { MediaListItem } from "./MediaListItem";
import { Pill } from "@/components/Pill";

export function FavouritesTab() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const favouriteIds = profile?.favouriteMovieIds ?? [];
  const results = useMoviesByIds(favouriteIds);
  const removeFavourite = useRemoveFavourite();

  const isLoading = profileLoading || results.some((r) => r.isLoading);
  const movies = results.map((r) => r.data).filter((m): m is NonNullable<typeof m> => m != null);

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
        <Heading as="h4" variant="heading-default-m">No favourites yet</Heading>
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
    <Column fillWidth gap="24">
      <Row horizontal="space-between" vertical="center">
          <Row gap ="8">
            <Heading as="h4" variant="heading-default-m">My Favourites</Heading>
            <Pill variant="rating" size="m" >
              {movies.length}
            </Pill>
          </Row>
        <Button href="/vibe" variant="secondary" prefixIcon="sparkle" size="s">
          Add more
        </Button>
      </Row>

      <Column fillWidth gap="8">
        {movies.map((movie) => (
          <MediaListItem
            key={movie.id}
            poster={movie.poster_path}
            title={movie.title}
            year={movie.release_date ? new Date(movie.release_date).getFullYear() : null}
            rating={movie.vote_average}
            actions={
              <IconButton
                icon="close"
                size="s"
                variant="ghost"
                tooltip="Remove"
                onClick={() => removeFavourite.mutate(movie.id)}
              />
            }
          />
        ))}
      </Column>
    </Column>
  );
}
