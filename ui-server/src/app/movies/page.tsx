import { movies as mockMovies } from "@/resources/movies";
import { Card, SmartImage, Grid, Flex } from "@/once-ui/components";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import EntityList from "@/components/EntityList/EntityList";
import { useEntity } from '@/hooks/useEntity';



export default function AllMoviesPage() {

  const { data, loading, error } = useEntity('movies');

  return (
    <>
    <Header />
    <EntityList
      useEntityHook={() => ({ data, loading, error })}
      mockData={mockMovies}
      entityType="movie"
      routePrefix="/content"
    />
    <Footer />
    </>
  );
}
