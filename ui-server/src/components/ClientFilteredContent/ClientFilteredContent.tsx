'use client';

import React from 'react';
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import EntityList from "@/components/EntityList/EntityList";
import { useMoviesBySlug } from '@/hooks/useMoviesBySlug';

interface ClientFilteredContentProps {
  slug: string;
}

const ClientFilteredContent: React.FC<ClientFilteredContentProps> = ({ slug }) => {
  const normalizedSlug = slug.toLowerCase();
  const { movies, loading, error } = useMoviesBySlug(normalizedSlug);

  return (
    <>
      <Header />
      <EntityList
        header={`Filter: ${slug}`}
        entityType="movie"
        mockData={[]}
        data={movies}
        loading={loading}
        error={error}
      />
      <Footer />
    </>
  );
};

export default ClientFilteredContent;
