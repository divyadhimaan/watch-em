"use client";

import { Fade, Column } from "../../packages/once-ui/components";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { EntityList } from "@/components/EntityList/EntityList";
import { CarouselCards } from "@/components/CarouselCards/CarouselCards";
import { FilterScroll } from "@/components/FilterScroll/FilterScroll";
import Scroll from "@/components/scroll";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const movieId = searchParams?.get("movie");

  return (
    <Column fillWidth paddingY="80" paddingX="s" horizontal="center" flex={1}>
      <Fade
        zIndex={3}
        pattern={{
          display: true,
          size: "4",
        }}
        position="fixed"
        top="0"
        left="0"
        to="bottom"
        height={5}
        fillWidth
        blur={0.25}
      />
      <Header />

      <Column
        overflow="hidden"
        as="main"
        maxWidth="xl"
        position="relative"
        radius="xl"
        horizontal="center"
        border="neutral-alpha-weak"
        fillWidth
      >
        <CarouselCards />
        <FilterScroll />
        <Scroll />

        <Footer />
      </Column>
    </Column>
  );
}
