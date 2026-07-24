'use client';

import ContentScroll from "./ContentScroll";
import { scrollSections as sections } from "@/resources/scrollSections";
import { useQueries } from '@tanstack/react-query';
import { moviesApi } from "@store/catalogApi";
import type { TMDBMovie } from "@app-types/tmdb";

import { useMoviesByCategory } from '@/hooks/useMovies';

export default function Scroll() {

  const queries = useQueries({
    queries: sections.map(section => ({
      queryKey: ["movies", section.category],
      queryFn: (): Promise<TMDBMovie[]> =>
        moviesApi.getByCategory(section.category),
      staleTime: 1000 * 60 * 5,
    })),
  });

  return (
    <>
      {sections.map((section, idx) => {
        const { data = [], isLoading } = queries[idx];

        return (
          <ContentScroll
            key={section.category}
            title={section.title}
            items={data}
            entityType="movie"
            loading={isLoading}
          />
        );
      })}
    </>
  );
}
