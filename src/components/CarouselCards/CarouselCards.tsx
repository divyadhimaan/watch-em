import React from "react";
import { ToggleButton } from "@once-ui/components";
import { Carousel } from "@/components/Carousel/Carousel";

import styles from "./CarouselCards.module.scss";
import { getImageUrl } from "@/utils/getImageUrl";
import { useMoviesByCategory } from "@/hooks/useMovies";

export const CarouselCards = () => {
  const { data } = useMoviesByCategory("popular");

  const images =
    data?.map((item) => ({
      src: getImageUrl(item.backdrop_path, "w1280"),
      alt: item.title,
      id: String(item.id),
      desc: item.overview,
      title: item.title,
      children: (
        <div className={styles.overlay}>
          <h2 className={styles.title}>{item.title}</h2>

          <button type="button" className={styles.playButton}>
            <ToggleButton prefixIcon="home" href="/" selected={false} />
            Let’s Play Movie
          </button>
        </div>
      ),
    })) ?? [];

  return (
    <Carousel
      aspectRatio="16/9"
      indicator="line"
      images={images}
      className={styles.carouselContainer}
    />
  );
};
