'use client';

import { movies as mockMovies } from "@/resources/movies";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import EntityList from "@/components/EntityList/EntityList";
import { useAllMovies } from "@/hooks/useMovies";


export default function AllMoviesPage() {
  const { data: movies, isLoading, error } = useAllMovies();


  return (
    <>
    <Header />
    <EntityList
      header="Movies"
      entityType="movie"
      mockData={mockMovies}
      data={movies}
      loading={isLoading}
      error={error}
    />
    <Footer />
    </>
  );
}
