'use client';

import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import FilteredMovieList from "@/components/filteredMovieList";
import { useMoviesBySlug } from '@/hooks/useMoviesBySlug';
import EntityList from "@/components/EntityList/EntityList";

interface PageProps {
  params: { slug: string }; 
}

const FilteredContentPage = ({ params }: PageProps) => {
  const { slug } = params;
  const normalizedSlug = slug.toLowerCase();

  const { movies, loading, error } = useMoviesBySlug(normalizedSlug);

  return (
    <>
      <Header />
      {/* <FilteredMovieList slug={normalizedSlug} /> */}
      <EntityList
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

export default FilteredContentPage;
