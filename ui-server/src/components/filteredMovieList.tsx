'use client';

import { useMoviesBySlug } from '@/hooks/useMoviesBySlug';
import { Card, Grid, SmartImage, Flex, Text } from "@/once-ui/components";
import React, { useMemo } from "react";
import { getImageUrl } from "@/utils/getImageUrl";

interface Props {
  slug: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const FilteredMovieList = ({ slug }: Props) => {
  const { movies, loading, error } = useMoviesBySlug(slug);
  // const shuffled = useMemo(() => shuffleArray(movies), [movies]);

  if (loading) return (
    <Flex
      direction="column"
      paddingY='160'
      align="center"
      vertical='center'
      className="min-h-screen"
    >
      <div className="w-16 h-16 bg-blue-500 rounded-full animate-pulse"></div>
      <p className="mt-4 text-gray-600">Loading movies...</p>
    </Flex>
  );

  if (error || !movies.length) {
    return (
      <Flex
        direction="column"
        paddingY='160'
        align="center"
        vertical='center'
        className="min-h-screen"
      >
        <div className="w-16 h-16 bg-blue-500 rounded-full animate-pulse"></div>
        <p className="mt-4 text-gray-600">No Movies found for selected filter</p>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      className="px-6 py-10 max-w-6xl mx-auto"
      gap="m"
      paddingY="xl"
      paddingX="l"
    >
      <h1 className="text-3xl font-bold capitalize mb-6">
        Movies for: {slug.replace(/-/g, " ")}
      </h1>
      <Grid columns={6} gap="12">
        {movies.map((item) => (
          <Card
            key={item.id}
            href={`/content/${item.id}`}
            className="p-0 rounded-xl shadow-md border-none overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative w-full aspect-[2/3] group">
              <SmartImage
                src={
                  item.poster_path
                    ? getImageUrl(item.poster_path)
                    : "/fallback.jpg"
                }
                alt={item.title}
                aspectRatio="3/4"
                enlarge
                radius="l"
                style={{
                  overflow: "hidden",
                  width: "200px",
                  height: "300px",
                }}
              />
            </div>
          </Card>
        ))}
      </Grid>
    </Flex>
  );
};

export default FilteredMovieList;
