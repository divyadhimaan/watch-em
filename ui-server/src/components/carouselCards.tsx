import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import {
  ToggleButton,
} from "@/once-ui/components";
import { Carousel } from "@/components/carousel";

import styles from "@/components/carouselCards.module.scss";


type Item = {
  id: string;
  title: string;
  overview: string;
  genre: string[];
  backdrop_path: string;
  poster_path: string;
  streaming: string[];
  vote_average: number;
  "release_date": string;
};

export const CarouselCards = () => {
  const [trended, setTrended] = useState<Item[]>([]);


  const fetchPopularMovies = async () => {
    console.log("Fetching popular movies for carousel...");
        axios.get('/api/movies/popular')
        .then(
          response => {
            const data = response.data;
            setTrended(data);
          }
          )
        .catch(error => console.error(error));
  }

  useEffect(() => {
    fetchPopularMovies();
  }, []);


  return (
    <Carousel
      aspectRatio="16/9"
      indicator="line"
      images={trended
        .map((item) => ({
          src: `http://image.tmdb.org/t/p/w1280${item.backdrop_path}`,
          alt: item.title,
          id: item.id,
          desc: item.overview,
          title: item.title,
          children: (
            <div className={styles.overlay}>
              <h2 className={styles.title}>{item.title}</h2>
              <button className={styles.playButton}>
                <ToggleButton prefixIcon="home" href="/" selected={false} /> Let’s Play Movie
              </button>
            </div>
          ),
        }))}
      className={styles.carouselContainer}
    />
  );
};
