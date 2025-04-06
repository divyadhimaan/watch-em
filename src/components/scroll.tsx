import { MovieScroll } from "@/components/movieScroll";
import { movies } from "@/resources/movies";

export default function Scroll() {
  const recommended = movies.slice(0, 8);
  const hindi = movies.slice(8, 15);

  return (
    <main className="bg-[#0f172a] min-h-screen px-6 py-8">
      <MovieScroll title="Recommended movies" movies={recommended} />
      <MovieScroll title="Movies originally in Hindi for you" movies={hindi} />
    </main>
  );
}
