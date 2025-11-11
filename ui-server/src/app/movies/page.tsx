'use client';

import { movies as mockMovies } from "@/resources/movies";
import { Card, SmartImage, Grid, Flex } from "@/once-ui/components";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import EntityList from "@/components/EntityList/EntityList";
import { useEntity } from '@/hooks/useEntity';


export default function AllMoviesPage() {
  const { data, loading, error } = useEntity('movies');

  console.log(data);
  return (
    <>
    <Header />
    <EntityList
      entityType="movie"
      mockData={mockMovies}
      data={data}
      loading={loading}
      error={error}
    />
    <Footer />
    </>
  );
}
