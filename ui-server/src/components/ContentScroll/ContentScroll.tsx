"use client";

import React, { useRef, useState, useEffect } from "react";
import { Card, IconButton, Flex, Text, Icon, SmartImage, Line } from "@/once-ui/components";
import styles from "./ContentScroll.module.scss";
import { Item } from '@/types/item';
import { getImageUrl } from "@/utils/getImageUrl";


type ContentScrollProps = {
  title: string;
  items: Item[];
};


const ContentScroll: React.FC<ContentScrollProps> = ({ title, items }) => {

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (el) {
      setShowLeft(el.scrollLeft > 0);
      setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }
  };


  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  const scrollLeft = () => {
      scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

  //   console.log("Scroll Width:", el.scrollWidth);
  // console.log("Client Width:", el.clientWidth);
  // console.log("Initial Scroll Left:", el.scrollLeft);

    el.scrollLeft = 0;

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);



  return (
    <div className="mb-10 px-4" style={{paddingLeft: "2%", marginBottom: "2%"}}>
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4" style={{marginBottom: "1%"}}>
        {title}
      </h2>

        <div className={styles.wrapper}>
        {showLeft && (
              <Flex paddingTop="20" paddingBottom="8" gap="8" horizontal="start" fitWidth>
                  <IconButton
                      icon="arrowLeft2"
                      size="l"
                      onClick={scrollLeft}
                      className={styles.scrollButton}
                  />
              </Flex>
          )}
          <div ref={scrollRef} className={styles.scrollContainer}>
          {items.map((item, index) => (
            <Card
              key={item.id}
              href={`/content/${item.id}`}
              direction="column"
              radius="l"
              style={{
                width: "200px",
                height: "300px",
                backgroundColor: "var(--surface)",
                borderRadius: "1rem",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                cursor: "pointer",
                flexShrink: 0,
                marginLeft: index === 0 ? '8px' : undefined,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.transform = "scale(1)")
              }
            >
              <SmartImage
                src={getImageUrl(item.poster_path)}
                alt={item.title}
                aspectRatio="2/3"
                enlarge
                radius="l"
                style={{
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  width: "180px",
                  height: "220px",
                }}
              />

              <Flex direction="column" gap="8" padding="8" wrap align="start">
                <Text
                  align="start"
                  paddingTop="8"
                  variant="body-strong-s"
                  color="onBackground"
                  className="truncate"
                >
                  {item.title}
                </Text>

                <Flex gap="8" align="center">
                  <Flex gap="4" align="center" paddingTop="8"  >
                    <Icon name="star" size="xs" color="warning" />
                    <Text size="l" color="onBackground" gap="4">
                    {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
                    </Text>
                    <Line vert maxHeight="24" />

                    <Text size="m" color="onBackground">
                      {item.release_date ? new Date(item.release_date).getFullYear() : 'N/A'}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Card>

          ))}
          </div>
  
          {showRight && (
                <Flex paddingTop="20" paddingBottom="8" gap="8" horizontal="start" fitWidth>
                    <IconButton
                        icon="arrowRight2"
                        size="l"
                        onClick={scrollRight}
                        className={styles.scrollButton}
                    />
                </Flex>
            )}
        </div>
      {/* </div> */}
    </div>
  );
};
export default ContentScroll;