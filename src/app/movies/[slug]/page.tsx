import { movies } from "@/resources/movies";
import { Card, Grid, SmartImage, Flex } from "@/once-ui/components";
import Link from "next/link";

export async function generateStaticParams() {
  const genres = new Set<string>();
  const platforms = new Set<string>();
  const years = new Set<string>();

  movies.forEach((movie) => {
    movie.genre.forEach((g) => genres.add(g.toLowerCase()));
    movie.streaming.forEach((s) => platforms.add(s.toLowerCase()));
    years.add(movie["release-year"].toString());
  });

  const tags = [...genres, ...platforms, ...years];

  return tags.map((tag) => ({ slug: tag }));
}

type Props = {
  params: {
    slug: string;
  };
};

export default function FilteredMoviesPage({ params }: Props) {
  const slug = params.slug.toLowerCase();

  const filteredMovies = movies.filter(
    (movie) =>
      movie.genre.map((g) => g.toLowerCase()).includes(slug) ||
      movie.streaming.map((s) => s.toLowerCase()).includes(slug) ||
      movie["release-year"].toString() === slug
  );

  console.log("Filtered Movies (client):", filteredMovies);
  return (
    <Flex direction="column" className="px-6 py-10 max-w-6xl mx-auto" gap="m" paddingY="xl" paddingX="l">
      {slug && (
        <h1 className="text-3xl font-bold capitalize mb-6">
          Movies for: {slug.replace(/-/g, " ")}
        </h1>
      )}
      {Array.isArray(movies) && movies.length > 0 ? (
        <Grid columns={6} gap="12">
          {filteredMovies.map((movie) => (
            <Card
              key={movie.id}
              className="p-0 rounded-xl shadow-md border-none overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative w-full aspect-[2/3] group">
                <SmartImage
                  src={movie.image}
                  alt={movie.title}
                  aspectRatio="3/4"
                  enlarge
                  radius="l"
                  style={{
                    overflow: "hidden",
                    width: "200px",
                    height: "300px",
                  }}
                />
              </div>
            </Card>
          ))}
        </Grid>
      ) : (
        <p>No movies found for this tag.</p>
      )}

    </Flex>
  );
}
