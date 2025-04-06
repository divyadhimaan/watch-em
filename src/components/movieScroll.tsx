"use client";

import React, { useRef, useState, useEffect } from "react";
import { Card, IconButton, Flex, Text, Icon, SmartImage, Line } from "@/once-ui/components";
import styles from "@/components/movieScroll.module.scss";


type Movie = {
  id: string;
  title: string;
  image: string;
  description: string;
  catch: string;
  rating: number;
  genre: string[];
  streaming: string[];
  "release-year": number;
};

type MovieScrollProps = {
  title: string;
  movies: Movie[];
};


export const MovieScroll: React.FC<MovieScrollProps> = ({ title, movies }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (el) {
      setShowLeft(el.scrollLeft > 0);
      setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 250, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll(); // Initial check

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <div className="mb-10 px-4">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
        {title}
      </h2>

      <div className={styles.wrapper}>
        {showLeft && (
          <Flex paddingTop="12" paddingBottom="8" gap="8" horizontal="start" fitWidth>
            <IconButton
              icon="arrowLeft2"
              size="l"
              onClick={scrollLeft}
              className={styles.scrollButton}
            />
          </Flex>
        )}

        <div ref={scrollRef} className={styles.scrollContainer}>
          <Flex horizontal="start" gap="12" padding="8">
            {movies.map((movie) => (
              <Card
                key={movie.id}
                href={`/movie/${movie.id}`}
                direction="column"
                radius="l"
                style={{
                  width: "180px",
                  height: "300px",
                  backgroundColor: "var(--surface)",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease-in-out",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.transform = "scale(1)")
                }
                >
                <SmartImage
                  src={movie.image}
                  alt={movie.title}
                  aspectRatio="2/3"
                  enlarge
                  radius="l"
                  style={{
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                    width: "180px",
                    height: "220px",
                  }}
                />

                <Flex direction="column" gap="8" padding="8" wrap align="start">
                  <Text
                    align="start"
                    paddingTop="8"
                    variant="body-strong-s"
                    color="onBackground"
                    className="truncate"
                  >
                    {movie.title}
                  </Text>

                  <Flex gap="8"  align="center">
                    <Flex gap="4" align="center" paddingTop="8"  >
                      <Icon name="star" size="xs" color="warning" />
                      <Text size="l" color="onBackground" gap="4">
                        {movie.rating}
                      </Text>
                      <Line vert maxHeight="24" />
                      
                      <Text size="m" color="onBackground">
                        {movie["release-year"]}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>

            ))}
          </Flex>
        </div>

        {showRight && (
          <Flex paddingTop="12" paddingBottom="8" gap="8" horizontal="start" fitWidth>
            <IconButton
              icon="arrowRight2"
              size="l"
              onClick={scrollRight}
              className={styles.scrollButton}
            />
          </Flex>
        )}
      </div>
    </div>
  );
};
