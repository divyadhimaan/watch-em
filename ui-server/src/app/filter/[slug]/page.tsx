
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import FilteredMovieList from "@/components/filteredMovieList";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const FilteredContentPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();

  return (
    <>
      <Header />
      <FilteredMovieList slug={normalizedSlug} />
      <Footer />
    </>
  );
};

export default FilteredContentPage;
