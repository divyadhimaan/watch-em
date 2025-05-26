import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import {
  ToggleButton,
} from "@/once-ui/components";
import { Carousel } from "@/components/carousel";

import styles from "@/components/carouselCards.module.scss";

import { movies } from "@/resources/movies"


export const CarouselCards = () => {
  const [trended, setTrended] = useState([]);


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

  return (
    <Carousel
      aspectRatio="16/9"
      indicator="line"
      images={movies
        .filter((movie) => movie.wallImage)
        .map((item) => ({
          src: item.wallImage!,
          alt: item.title,
          id: item.id,
          desc: item.description,
          catchPhrase: item.catch,
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
