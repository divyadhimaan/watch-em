
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import FilteredMovieList from "@/components/filteredMovieList";

interface PageProps {
  params: { slug: string };
}

const FilteredContentPage = ({ params }: PageProps) => {
  const slug = params.slug.toLowerCase();

  return (
    <>
      <Header />
      <FilteredMovieList slug={slug} />
      <Footer />
    </>
  );
};

export default FilteredContentPage;
