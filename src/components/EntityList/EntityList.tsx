"use client";

import { Card, Grid, SmartImage, Flex, Text, Media } from "@once-ui/components";
import { getImageUrl } from "@/utils/getImageUrl";
import Loader from "../Loader/Loader";

export interface Entity {
  id: string | number;
  title?: string;
  name?: string;
  poster_path?: string;
  image?: string;
}

interface EntityListProps {
  header?: string;
  entityType: "movie" | "series" | "person" | string;
  mockData: Entity[];
  routePrefix?: string;
  data?: Entity[];
  loading?: boolean;
  error?: Error | null;
}

export const EntityList: React.FC<EntityListProps> = ({
  header,
  entityType,
  mockData,
  routePrefix = "/content",
  data,
  loading,
  error,
}) => {
  if (error) return <div>Error: {error.message}</div>;

  if (loading) return <Loader />;

  const entityList = !error && data?.length ? data : mockData;

  if (!entityList.length)
    return (
      <Flex
        direction="column"
        paddingY="160"
        align="center"
        vertical="center"
        className="min-h-screen"
      >
        <p className="mt-4 text-gray-600">No {entityType}s found.</p>
      </Flex>
    );

  return (
    <Flex
      direction="column"
      className="px-6 py-10 max-w-6xl mx-auto"
      gap="m"
      paddingY="xl"
      paddingX="l"
    >
      {header && (
        <Flex direction="row" className="mb-6" align="center">
          <h2 className="text-2xl font-semibold text-gray-800">{header}</h2>
        </Flex>
      )}

      <Grid columns={6} gap="12">
        {entityList.map((item) => (
          <Card
            key={item.id}
            href={`${routePrefix}/${item.id}`}
            className="p-0 rounded-xl shadow-md border-none overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative w-full aspect-[2/3] group">
              {item.poster_path ? (
                <Media
                  src={getImageUrl(item.poster_path)}
                  alt={item.title || item.name || entityType}
                  aspectRatio="3/4"
                  radius="s"
                  style={{ overflow: "hidden", width: "200px", height: "300px" }}
                />
              ) : (
                <Flex
                  direction="column"
                  horizontal="space-between"
                  align="center"
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "var(--neutral-alpha-weak)",
                    border: "1px solid var(--neutral-alpha-medium)",
                    backdropFilter: "blur(4px)",
                    padding: "16px",
                  }}
                >
                  {/* <Media
                  // caption={item.title || item.name || entityType}
                  src={getImageUrl(item.poster_path)}
                  alt={item.title || item.name || entityType}
                  loading
                  aspectRatio="3/4"
                  enlarge
                  radius="s"
                  style={{ overflow: "hidden", width: "200px", height: "300px" }}
                /> */}
                   {/* subtle placeholder label */}
                   <Text size="xs" color="neutral-medium" style={{ opacity: 0.6 }}>
                     Poster not available
                   </Text>

                   {/* movie title */}
                   <Text
                    size="s"
                    weight="strong"
                    align="center"
                    style={{
                      lineHeight: "1.2",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.title || item.name || "Untitled"}
                  </Text>
                </Flex>
              )}
            </div>
          </Card>
        ))}
      </Grid>
    </Flex>
  );
};
