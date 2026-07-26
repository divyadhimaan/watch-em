'use client';

import { movies as mockMovies } from "@/resources/movies";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { EntityList } from "@/components/EntityList/EntityList";
import { Button } from "@once-ui/components";
import { useAllMovies } from "@/hooks/useMovies";

export default function AllMoviesPage() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAllMovies();

  const seen = new Set<number>();
  const movies = (data?.pages.flatMap((p) => p.results) ?? []).filter((m) => {
    if (seen.has(m.id)) return false;
    seen.add(m.id);
    return true;
  });

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
      {!isLoading && hasNextPage && (
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: "3rem" }}>
          <Button
            label={isFetchingNextPage ? "Loading..." : "Load More"}
            variant="secondary"
            size="m"
            loading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        </div>
      )}
      <Footer />
    </>
  );
}
