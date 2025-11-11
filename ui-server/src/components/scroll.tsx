'use client';

import ContentScroll from "./ContentScroll";
import { scrollSections as sections } from "@/resources/scrollSections";
import { useQueries } from '@tanstack/react-query';
import { useMoviesByCategory } from '@/hooks/useMoviesByCategory';

export default function Scroll() {
  const queries = useQueries({
    queries: sections.map(section => ({
      queryKey: ['movies', section.category],
      queryFn: () => fetchMovies(section.category),
      staleTime: 1000 * 60 * 5,
    })),
  });

  // helper to fetch movies
  async function fetchMovies(category: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/movies/${category}`);
    return res.json();
  }

  return (
    <main className="bg-[#0f172a] min-h-screen px-6 py-8 space-y-8">
      {sections.map((section, idx) => {
        const { data = [] } = queries[idx] ?? {};
        return (
          <div key={section.category}>
            <ContentScroll
              title={section.title}
              items={data?.slice(0, section.limit ?? 7) ?? []}
            />
          </div>
        );
      })}
    </main>
  );
}
