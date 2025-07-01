import { ContentScroll } from "@/components/contentScroll";
import { movies } from "@/resources/movies";
import { series } from "@/resources/series";
import { allContent } from "@/resources/allContent";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useMoviesByCategory } from '@/hooks/useMoviesByCategory';
import { Item } from '@/types/item';


export default function Scroll() {

  const { data: trended = [] } = useMoviesByCategory('popular');
  const { data: topRatedMovies = [] } = useMoviesByCategory('top-rated');
  const { data: upcomingMovies = [] } = useMoviesByCategory('upcoming');
  const { data: inTheatres = [] } = useMoviesByCategory('in-theatres');




  const recommended = [...allContent]
  .sort(() => Math.random() - 0.5)
  .slice(0, 7);
  const recommendedSeries = series.slice(0,7);
  const hindi = movies.slice(13, 19);
  const watchAgain = movies.slice(8,15);

  return (
    <main className="bg-[#0f172a] min-h-screen px-6 py-8">
      <ContentScroll title="Trending" items={trended.slice(0, 7)} />
      <ContentScroll title="Top Rated" items={topRatedMovies.slice(0, 7)} />
      <ContentScroll title="Upcoming" items={upcomingMovies.slice(0, 7)} />
      <ContentScroll title="In theatres" items={inTheatres.slice(0, 7)} />


      {/* <ContentScroll title="Recommended" items={recommended} /> */}
      {/* <ContentScroll title="Series to Binge" items={recommendedSeries} /> */}

      {/* <ContentScroll title="Watch Again" items={watchAgain} /> */}
      {/* <ContentScroll title="Movies originally in Hindi for you" items={hindi} /> */}
    </main>
  );
}
