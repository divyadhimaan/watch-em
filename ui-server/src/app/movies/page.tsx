import { movies } from "@/resources/movies";
import { Card, SmartImage, Grid, Flex } from "@/once-ui/components";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import MovieList from "@/components/MovieList";



export default function AllMoviesPage() {

  return (
    <>
    <Header />
    <MovieList/>

    <Footer />
    </>
  );
}
