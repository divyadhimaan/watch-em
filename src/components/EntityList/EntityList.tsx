"use client";

import { Card, Flex, Text, Media, Column, Row, Icon, Heading } from "@once-ui/components";
import { getImageUrl } from "@/utils/getImageUrl";
import Loader from "../Loader/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./EntityList.module.scss";

export interface Entity {
  id: string | number;
  title?: string;
  name?: string;
  poster_path?: string;
  image?: string;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  // mock-data fields
  rating?: number;
  "release-year"?: number | string;
}

interface EntityListProps {
  header?: string;
  entityType: "movie" | "series" | "person" | string;
  mockData: Entity[];
  routePrefix?: string;
  data?: Entity[];
  loading?: boolean;
  error?: Error | null;
}

const getYear = (item: Entity): string | number | null => {
  const date = item.release_date || item.first_air_date;
  if (date) {
    const year = new Date(date).getFullYear();
    if (!Number.isNaN(year)) return year;
  }
  return item["release-year"] ?? null;
};

const getRating = (item: Entity): number | null => {
  const rating = item.vote_average ?? item.rating;
  return typeof rating === "number" ? rating : null;
};

export const EntityList: React.FC<EntityListProps> = ({
  header,
  entityType,
  mockData,
  data,
  loading,
  error,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (error) return <div>Error: {error.message}</div>;

  if (loading) return <Loader />;

  const source = !error && data?.length ? data : mockData;

  // The API can return the same title across multiple categories — dedupe by id
  // so we don't render duplicate rows (and collide on React keys).
  const seen = new Set<string>();
  const entityList = source.filter((item) => {
    const key = String(item.id);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (!entityList.length)
    return (
      <Flex
        direction="column"
        paddingY="160"
        align="center"
        vertical="center"
        className="min-h-screen"
      >
        <p className="mt-4 text-gray-600">No {entityType}s found.</p>
      </Flex>
    );

  return (
    <Flex direction="column" gap="m" paddingY="xl" paddingX="l" horizontal="center">
      {header && (
        <Row fillWidth style={{ maxWidth: "1100px" }} paddingX="4">
          <Heading as="h2" variant="display-default-xs">
            {header}
          </Heading>
        </Row>
      )}

      <div className={styles.list}>
        {entityList.map((item) => {
          const itemTitle = item.title || item.name || "Untitled";
          const year = getYear(item);
          const rating = getRating(item);

          return (
            <Card
              key={item.id}
              fillWidth
              radius="l"
              border="neutral-alpha-medium"
              onClick={() => {
                const params = new URLSearchParams(searchParams?.toString());
                params.set("movie", String(item.id));
                router.push(`?${params.toString()}`, { scroll: false });
              }}
              style={{ cursor: "pointer" }}
              className={styles.row}
            >
              {/* Poster — left */}
              <div className={styles.posterWrap}>
                {item.poster_path ? (
                  <Media
                    src={getImageUrl(item.poster_path)}
                    alt={itemTitle}
                    fillWidth
                    className={styles.poster}
                    style={{ height: "100%" }}
                  />
                ) : (
                  <div className={styles.posterPlaceholder}>
                    <Text size="xs" onBackground="neutral-medium" style={{ opacity: 0.6 }}>
                      Poster not available
                    </Text>
                    <Text size="s" weight="strong" align="center">
                      {itemTitle}
                    </Text>
                  </div>
                )}
                {rating !== null && (
                  <div className={styles.ratingBadge}>
                    <Icon name="star" size="xs" color="warning" />
                    <Text size="xs">{rating.toFixed(1)}</Text>
                  </div>
                )}
              </div>

              {/* Info — right */}
              <div className={styles.info}>
                <Text as="h3" variant="heading-strong-s" className={styles.title}>
                  {itemTitle}
                </Text>

                <Row gap="12" vertical="center" onBackground="neutral-medium" className={styles.metaRow}>
                  {year !== null && <Text size="s">{year}</Text>}
                  {rating !== null && (
                    <Row gap="4" vertical="center">
                      <Icon name="star" size="xs" color="warning" />
                      <Text size="s">{rating.toFixed(1)}</Text>
                    </Row>
                  )}
                </Row>

                {item.overview && (
                  <Text
                    size="s"
                    onBackground="neutral-weak"
                    className={styles.overview}
                  >
                    {item.overview}
                  </Text>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </Flex>
  );
};
