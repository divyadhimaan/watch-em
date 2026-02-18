'use client';

import {
  Column,
  Row,
  Text,
  Heading,
  Button,
  Card,
  SmartImage,
} from "@once-ui/components";

interface Playlist {
  id: number;
  name: string;
  count: number;
  image: string;
}

interface PlaylistsTabProps {
  playlists: Playlist[];
}

export function PlaylistsTab({ playlists }: PlaylistsTabProps) {
  return (
    <Column fillWidth gap="16">
      <Row horizontal="space-between" vertical="center">
        <Heading as="h4" variant="heading-default-m">
          My Playlists
        </Heading>
        <Button variant="primary" prefixIcon="plus">
          Create Playlist
        </Button>
      </Row>
      
      <Column fillWidth gap="12">
        {playlists.map((playlist) => (
          <Card
            key={playlist.id}
            href={`/playlists/${playlist.id}`}
            padding="0"
            radius="l"
            overflow="hidden"
            height={8}
            fillWidth
          >
            <Row gap="0" fillWidth>
              {/* Poster on the left */}
              <SmartImage
                src={playlist.image}
                alt={playlist.name}
                aspectRatio="2/3"
                style={{ 
                  width: "200px", 
                  height: "auto",
                  objectFit: "cover",
                  flexShrink: 0
                }}
              />
              {/* Text on the right */}
              <Column 
                padding="16" 
                gap="4" 
                fillWidth
                vertical="center"
                style={{ flex: "1" }}
              >
                <Text weight="strong" size="m">
                  {playlist.name}
                </Text>
                <Text size="s" onBackground="neutral-weak">
                  {playlist.count} movies
                </Text>
              </Column>
            </Row>
          </Card>
        ))}
      </Column>
    </Column>
  );
}
