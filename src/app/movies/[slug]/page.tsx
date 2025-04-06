import { GetStaticPaths, GetStaticProps } from "next";
import { movies } from "@/resources/movies";
import Image from "next/image";
import { Card } from "@/once-ui/components";
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
    const genres = new Set<string>();
    const platforms = new Set<string>();
    const years = new Set<string>();
  
    movies.forEach((movie) => {
      movie.genre.forEach((g) => genres.add(g.toLowerCase()));
      movie.streaming.forEach((s) => platforms.add(s.toLowerCase()));
      years.add(movie["release-year"].toString());
    });
  
    const paths = [...genres, ...platforms, ...years].map((tag) => ({
      params: { slug: tag },
    }));
  
    return {
      paths,
      fallback: false, // set to true if you want to support more dynamic tags later
    };
  };

const getStaticProps: GetStaticProps = async (context) => {
    const slug = context.params?.slug?.toString().toLowerCase() || "";

    const filteredMovies = movies.filter(
        (movie) =>
            movie.genre.map((g) => g.toLowerCase()).includes(slug) ||
            movie.streaming.map((s) => s.toLowerCase()).includes(slug) ||
            movie["release-year"].toString() === slug
    );

    return {
        props: {
            slug,
            filteredMovies: filteredMovies || [],
        },
    };
};

type Props = {
    slug: string;
    filteredMovies: typeof movies;
  };


export default function FilteredMoviesPage({ slug, filteredMovies }: Props) {
    return (
        <div className="px-6 py-10 max-w-6xl mx-auto">
            {slug && (
                <h1 className="text-3xl font-bold capitalize mb-6">
                    Movies for: {slug.replace(/-/g, " ")}
                </h1>
            )}
            {Array.isArray(filteredMovies) && filteredMovies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredMovies.map((movie) => (
                        <Card key={movie.id} className="p-0 overflow-hidden">
                            <div className="relative w-full h-64">
                                <Image
                                    src={movie.image}
                                    alt={movie.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-1">{movie.title}</h3>
                                <p className="text-sm text-muted-foreground">{movie.catch}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <p>No movies found for this tag.</p>
            )}
        </div>
    );
}
