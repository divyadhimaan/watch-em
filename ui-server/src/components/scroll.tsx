'use client';

import ContentScroll from "./ContentScroll";
import {scrollSections as sections } from "@/resources/scrollSections";
import { useMoviesByCategory } from '@/hooks/useMoviesByCategory';

interface Section {
  title: string;
  category: string;
  limit?: number;
}

export default function Scroll() {
  return (
    <main className="bg-[#0f172a] min-h-screen px-6 py-8 space-y-8">
      {sections.map((section: Section) => {
        const { data = [] } = useMoviesByCategory(section.category);

        return (
          <div key={section.category}>
              <ContentScroll
                title={section.title}
                items={data.slice(0, section.limit ?? 7)}
              />
          </div>
        );
      })}
    </main>
  );
}
