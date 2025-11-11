'use client';

import React from 'react';
import { Card, Grid, SmartImage, Flex } from "@/once-ui/components";
import { getImageUrl } from "@/utils/getImageUrl";

// Generic type for entities
interface Entity {
  id: string | number;
  title?: string;
  name?: string;
  poster_path?: string;
  image?: string;
}

interface EntityListProps {
  useEntityHook: () => { data: Entity[]; loading: boolean; error: boolean };
  mockData: Entity[];
  entityType: 'movie' | 'series' | 'person' | string;
  routePrefix?: string;
}

const EntityList: React.FC<EntityListProps> = ({
  useEntityHook,
  mockData,
  entityType,
  routePrefix = '/content',
}) => {
  const { data, loading, error } = useEntityHook();

  if (loading)
    return (
      <Flex
        direction="column"
        paddingY="160"
        align="center"
        vertical="center"
        className="min-h-screen"
      >
        <div className="w-16 h-16 bg-blue-500 rounded-full animate-pulse"></div>
        <p className="mt-4 text-gray-600">Loading {entityType}s...</p>
      </Flex>
    );

  const entityList = (!error && data?.length) ? data : mockData;

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
      <Grid columns={6} gap="12">
        {entityList.map((item) => (
          <Card
            key={item.id}
            href={`${routePrefix}/${item.id}`}
            className="p-0 rounded-xl shadow-md border-none overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative w-full aspect-[2/3] group">
              <SmartImage
                src={
                  item.poster_path
                    ? getImageUrl(item.poster_path)
                    : item.image || ''
                }
                alt={item.title || item.name || entityType}
                aspectRatio="3/4"
                enlarge
                radius="l"
                style={{
                  overflow: "hidden",
                  width: "200px",
                  height: "300px",
                }}
              />
            </div>
          </Card>
        ))}
      </Grid>
    </Flex>
  );
};

export default EntityList;
