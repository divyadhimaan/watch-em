import { ContentScroll } from "@/components/contentScroll";
import { movies } from "@/resources/movies";
import { series } from "@/resources/series";
import { allContent } from "@/resources/allContent";
import axios from 'axios';
import { useState, useEffect } from "react";


export default function Scroll() {
  const [trended, setTrended] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const fetchPopularMovies = async () => {
    console.log("Fetching popular movies...");
        axios.get('/api/movies/popular')
        .then(
          response => {
            const data = response.data;
            console.log(data);
            setTrended(data);
          }
          )
        .catch(error => console.error(error));
  }

  const fetchTopRatedMovies = async () => {
    console.log("Fetching top rated movies...");
        axios.get('/api/movies/top-rated')
        .then(
          response => {
            const data = response.data;
            console.log(data);
            setTopRated(data);
          }
          )
        .catch(error => console.error(error));
  }

  useEffect(() => {
    fetchPopularMovies();
    fetchTopRatedMovies();
  }, []);

  const recommended = [...allContent]
  .sort(() => Math.random() - 0.5)
  .slice(0, 7);
  const recommendedSeries = series.slice(0,7);
  const hindi = movies.slice(13, 19);
  const watchAgain = movies.slice(8,15);

  return (
    <main className="bg-[#0f172a] min-h-screen px-6 py-8">
      <ContentScroll title="Trending" items={trended.slice(0, 7)} />
      <ContentScroll title="Top Rated" items={topRated.slice(0, 7)} />

      {/* <ContentScroll title="Recommended" items={recommended} /> */}
      {/* <ContentScroll title="Series to Binge" items={recommendedSeries} /> */}

      {/* <ContentScroll title="Watch Again" items={watchAgain} /> */}
      {/* <ContentScroll title="Movies originally in Hindi for you" items={hindi} /> */}
    </main>
  );
}
