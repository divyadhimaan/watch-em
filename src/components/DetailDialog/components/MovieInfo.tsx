"use client";

import { Column, Row, Text, Heading, Badge } from "@once-ui/components";
import type { TMDBMovieDetails } from "@app-types/tmdb";
import { getImageUrl } from "@/utils/getImageUrl";
import styles from "../DetailDialog.module.scss";

function formatRuntime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m > 0 ? `${m}m` : ""}`.trim() : `${m}m`;
}

type Props = {
  movie: TMDBMovieDetails;
};

export function MovieInfo({ movie }: Props) {
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : null;

  return (
    <div className={styles.detailGrid}>
      <div className={styles.poster}>
        <img src={getImageUrl(movie.poster_path, "w342")} alt={movie.title} />
      </div>

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
  );
}
