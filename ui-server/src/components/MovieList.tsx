'use client';

import { useMovies } from '@/hooks/useMovies';
import { Card, Grid, SmartImage, Flex } from "@/once-ui/components";
import React, { useMemo } from "react";
import { getImageUrl } from "@/utils/getImageUrl";
import { movies as mockMovies } from "@/resources/movies";


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

const MovieList = () => {
  const { movies, loading, error } = useMovies();
  // const shuffled = useMemo(
  //   () => (movies && movies.length > 0 ? shuffleArray(movies) : []),
  //   [movies]
  // );
  if (loading) return <div className="p-6 text-center">Loading...</div>;
  // if (error || !movies.length)
  //   return <div className="p-6 text-center text-red-500">No movies found.</div>;

  const movieList = (!error && movies?.length) ? movies : mockMovies;


  return (
    <Flex
      direction="column"
      className="px-6 py-10 max-w-6xl mx-auto"
      gap="m"
      paddingY="xl"
      paddingX="l"
    >
      
      <Grid columns={6} gap="12">
        {movieList.map((item) => (
          <Card
            key={item.id}
            href={`/content/${item.id}`}
            className="p-0 rounded-xl shadow-md border-none overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative w-full aspect-[2/3] group">
              <SmartImage
                src={
                  item?.poster_path
                    ? getImageUrl(item.poster_path)
                    : item.poster_path
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

export default MovieList;
