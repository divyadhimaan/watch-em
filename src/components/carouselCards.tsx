import React from 'react'
import {
    ToggleButton,
} from "@/once-ui/components";
import { Carousel } from "@/components/carousel";

import styles from "@/components/carouselCards.module.scss";

import { walls } from "@/resources/movies"

// import { Icon } from "@/components/Icon"; 


export const CarouselCards = () => {
    return (
      <Carousel
        aspectRatio="16/9"
        indicator="line"
        images={walls.map((item) => ({
          src: item.image,
          alt: item.title,
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
