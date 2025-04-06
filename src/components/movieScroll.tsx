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


  return (
    <div className="mb-10 px-4" style={{paddingLeft: "2%", marginBottom: "2%"}}>
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4" style={{marginBottom: "2%"}}>
        {title}
      </h2>

      {/* <div style={{ overflowX: "auto", display: "flex", gap: "12px", padding: "0 8px" }}> */}
        <Flex horizontal="start" gap="12" paddingX="l" style={{ display: "flex", gap: "12px", padding: "0 8px" }}>
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
                flexShrink: 0
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

                <Flex gap="8" align="center">
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
      {/* </div> */}
    </div>
  );
};
