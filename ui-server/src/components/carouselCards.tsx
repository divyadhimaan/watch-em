import React from 'react'
import { useState, useEffect } from "react";
import {
  ToggleButton,
} from "@/once-ui/components";
import { Carousel } from "@/components/carousel";

import styles from "@/components/carouselCards.module.scss";
import { usePopularMovies } from '@/hooks/usePopularMovies';



export const CarouselCards = () => {

  const { data: trending = [] } = usePopularMovies();

  return (
    <Carousel
      aspectRatio="16/9"
      indicator="line"
      images={trending
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
