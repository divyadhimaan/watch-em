'use client';

import { Column, Row, Text, Heading, Button } from "@once-ui/components";

export function PlaylistsTab() {
  return (
    <Column fillWidth gap="16">
      <Row horizontal="space-between" vertical="center">
        <Heading as="h4" variant="heading-default-m">My Playlists</Heading>
        <Button variant="primary" prefixIcon="plus">Create Playlist</Button>
      </Row>

      <Column fillWidth gap="12" paddingY="32" horizontal="center">
        <Heading as="h4" variant="heading-default-m">No playlists yet</Heading>
        <Text onBackground="neutral-weak" align="center">
          Create a playlist to organise your favourite movies.
        </Text>
      </Column>
    </Column>
  );
}
