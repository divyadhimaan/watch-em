"use client";

import { type FC, useRef, useState, useEffect, useCallback } from "react";
import { Card, IconButton, Text, Icon, Column, Media, Line, Row } from "@once-ui/components";
import type { EntityType } from "@app-types/Entity";
import type { TMDBMovie, TMDBSeries } from "@app-types/tmdb";
import styles from "./ContentScroll.module.scss";
import { getImageUrl } from "@/utils/getImageUrl";

type ScrollEntity = TMDBMovie | TMDBSeries;

type ContentScrollProps = {
  title: string;
  items: ScrollEntity[];
  entityType: EntityType;
  loading: boolean;
};

const ContentScroll: FC<ContentScrollProps> = ({ title, items, entityType }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction === "right" ? el.clientWidth * 0.8 : -el.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Use a short timeout so the DOM finishes layout before measuring
    const timer = setTimeout(() => checkScroll(), 50);

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      clearTimeout(timer);
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
    // Re-run whenever items change so arrows appear after async data loads
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkScroll]);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{title}</h2>

      <div className={styles.wrapper}>
        {showLeft && (
          <IconButton
            icon="arrowLeft2"
            size="m"
            onClick={() => scrollByAmount("left")}
            className={`${styles.scrollButton} ${styles.left}`}
          />
        )}

        <div ref={scrollRef} className={styles.scrollContainer}>
          {items.map((item) => {
            const releaseYear =
              entityType === "movie"
                ? (item as TMDBMovie).release_date
                : (item as TMDBSeries).first_air_date;

            const itemTitle =
              entityType === "movie" ? (item as TMDBMovie).title : (item as TMDBSeries).name;

            return (
              <Card
                key={item.id}
                radius="l-4"
                direction="column"
                border="neutral-alpha-medium"
                href={`/content/${item.id}`}
                className={styles.cardItem}
              >
                <Media
                  border="neutral-alpha-weak"
                  // sizes="800px"
                  fillWidth
                  aspectRatio="2 / 3"
                  radius="l"
                  alt={itemTitle}
                  src={getImageUrl(item.poster_path)}
                />
                <Column fillWidth paddingX="12" paddingY="12" gap="8">
                  <Text variant="label-default-s">{itemTitle}</Text>
                </Column>
                <Line background="neutral-alpha-medium" />
                <Row
                  paddingX="20"
                  paddingY="12"
                  gap="8"
                  vertical="center"
                  textVariant="label-default-s"
                  onBackground="neutral-medium"
                >
                  <Icon name="star" size="xs" color="warning" />
                  <Text size="s">{item.vote_average ? item.vote_average.toFixed(1) : "N/A"}</Text>
                </Row>
              </Card>
            );
          })}
        </div>

        {showRight && (
          <IconButton
            icon="arrowRight2"
            size="m"
            onClick={() => scrollByAmount("right")}
            className={`${styles.scrollButton} ${styles.right}`}
          />
        )}
      </div>
    </section>
  );
};

export default ContentScroll;
