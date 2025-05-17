import React, { useEffect, useState, useRef } from "react";
import { Flex, RevealFx, Scroller, SmartImage, Fade, ToggleButton } from "@/once-ui/components";

interface Image {
  src: string;
  alt: string;
  catchPhrase: string;
  id: string;
}

interface CarouselProps extends React.ComponentProps<typeof Flex> {
  images: Image[];
  indicator?: "line" | "thumbnail";
  aspectRatio?: string;
  sizes?: string;
  revealedByDefault?: boolean;
  autoSlideInterval?: number;
  height?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images = [],
  indicator = "line",
  aspectRatio = "16 / 9",
  sizes,
  revealedByDefault = false,
  autoSlideInterval = 5000,
  height = "400px",
  ...rest
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(revealedByDefault);
  const nextImageRef = useRef<HTMLImageElement | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const autoSlideTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const preloadNextImage = (nextIndex: number) => {
    if (nextIndex >= 0 && nextIndex < images.length) {
      nextImageRef.current = new Image();
      nextImageRef.current.src = images[nextIndex].src;
    }
  };

  const handleControlClick = (nextIndex: number) => {
    if (nextIndex !== activeIndex && !transitionTimeoutRef.current) {
      preloadNextImage(nextIndex);

      setIsTransitioning(false);

      setTimeout(() => {
        setActiveIndex(nextIndex);
        setIsTransitioning(true);
      }, 200);
    }
  };


  useEffect(() => {
    if (images.length > 1 && autoSlideInterval > 0) {
      autoSlideTimeoutRef.current = setInterval(() => {
        setIsTransitioning(false);
        setTimeout(() => {
          setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
          setIsTransitioning(true);
        }, 200);
      }, autoSlideInterval);
    }

    return () => clearInterval(autoSlideTimeoutRef.current);
  }, [images.length, autoSlideInterval]);

  if (images.length === 0) {
    return null;
  }

  return (
    <Flex fillWidth gap="12" direction="column" {...rest}>
      <RevealFx
        fillWidth
        trigger={isTransitioning}
        translateY="16"
        // aspectRatio={aspectRatio}
        speed="fast"
      >
        <div style={{ position: "relative", width: "100%", height: height }}>
          <Fade
            zIndex={3}
            position="fixed"
            top="0"
            base="overlay"
            left="0"
            to="right"
            width={80}
            fillHeight
            blur={0.5}
          />
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {images.map((image, index) => (
              <SmartImage
                key={index}
                sizes={sizes}
                priority
                radius="l"
                border="neutral-alpha-weak"
                alt={image.alt}
                aspectRatio={aspectRatio}
                src={image.src}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: activeIndex === index ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                }}
              />
            ))}

            <div
              style={{
                position: "absolute",
                top: "50%",
                // left: "10%", 
                transform: "translateY(-50%)",
                color: "white",
                textAlign: "left",
                textShadow: "3px 3px 6px rgba(0, 0, 0, 0.8)",
                zIndex: 100,
                width: "40%",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              {/* Movie title */}
              <div
                style={{
                  fontSize: "2.8rem",
                  fontWeight: "900",
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                {images[activeIndex]?.catchPhrase}
              </div>
              <div
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "500",
                  fontFamily: "'Cinzel', serif",
                  marginTop: "12px",
                  lineHeight: "1.5",
                  opacity: 0.9,
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                {/* Movie Phrase */}
                <ToggleButton size="l" prefixIcon="arrowRight" label="Stalk now!" selected={false} href={`/movie/${images[activeIndex].id}`}/>
                {/* <span>Stalk now!</span> */}
              </div>
            </div>
          </div>
        </div>
      </RevealFx>
      {/* {images.length > 1 && (
        <>
          {indicator === "line" ? (
            <Flex gap="4" paddingX="s" fillWidth horizontal="center">
              {images.map((_, index) => (
                <Flex
                  key={index}
                  onClick={() => handleControlClick(index)}
                  style={{
                    background:
                      activeIndex === index
                        ? "var(--neutral-on-background-strong)"
                        : "var(--neutral-alpha-medium)",
                    transition: "background 0.3s ease",
                  }}
                  cursor="interactive"
                  fillWidth
                  height="2"
                ></Flex>
              ))}
            </Flex>
          ) : (
            <Scroller fillWidth gap="4" onItemClick={handleControlClick}>
              {images.map((image, index) => (
                <Flex
                  key={index}
                  style={{
                    border: activeIndex === index ? "2px solid var(--brand-solid-strong)" : "none",
                    borderRadius: "var(--radius-m-nest-4)",
                    transition: "border 0.3s ease",
                  }}
                  cursor="interactive"
                  padding="4"
                  width="80"
                  height="80"
                >
                  <SmartImage
                    alt={image.alt}
                    aspectRatio="1 / 1"
                    sizes="120px"
                    src={image.src}
                    cursor="interactive"
                    radius="m"
                    transition="macro-medium"
                  />
                </Flex>
              ))}
            </Scroller>
          )}
        </>
      )} */}
    </Flex>
  );
};

Carousel.displayName = "Carousel";
export { Carousel };
