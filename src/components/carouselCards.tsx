import React from 'react'
import {
    ToggleButton,
} from "@/once-ui/components";
import { Carousel } from "@/components/carousel";

import styles from "@/components/carouselCards.module.scss";

// import { Icon } from "@/components/Icon"; 

const carouselData = [
    {
        title: "The Adventure of Blue Sword",
        image: "/images/demo.png",
    },
    {
        title: "Recalling the journey of Dol's exciting story",
        image: "/images/cover.jpg",
    },
];

export const CarouselCards = () => {
    return (
      <Carousel
        aspectRatio="16/9"
        indicator="line"
        images={carouselData.map((item) => ({
          src: item.image,
          alt: item.title,
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
