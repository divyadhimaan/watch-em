'use client';

import { movies as mockMovies } from "@/resources/movies";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import EntityList from "@/components/EntityList/EntityList";
import { useEntityFilters } from "@/hooks/useEntities";


export default function AllMoviesPage() {
  const { data, isLoading, error } = useEntityFilters("movies");

  return (
    <>
    <Header />
    <EntityList
      header="Movies"
      entityType="movie"
      mockData={mockMovies}
      data={data}
      loading={isLoading}
      error={error}
    />
    <Footer />
    </>
  );
}
