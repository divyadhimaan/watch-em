'use client';

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Column,
  Row,
  Text,
  Heading,
  Button,
  IconButton,
  Input,
  Spinner,
} from "@once-ui/components";
import { usePlaylists } from "@/hooks/usePlaylists";
import { profileApi } from "@store/profileApi";
import { useAuth } from "@/context/AuthContext";
import { getImageUrl } from "@/utils/getImageUrl";
import styles from "./PlaylistsTab.module.scss";

export function PlaylistsTab() {
  const { token } = useAuth();
  const { playlists, isLoading, createPlaylist, deletePlaylist, removeFromPlaylist } =
    usePlaylists();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const { data: expandedDetail, isLoading: detailLoading } = useQuery({
    queryKey: ["playlist", expandedId],
    queryFn: () => {
      if (!token || !expandedId) throw new Error();
      return profileApi.getPlaylist(token, expandedId);
    },
    enabled: !!token && !!expandedId,
  });

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    createPlaylist(newTitle.trim());
    setNewTitle("");
    setIsCreating(false);
  };

  const handleToggle = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (isLoading) {
    return (
      <Column fillWidth horizontal="center" paddingY="48">
        <Spinner size="l" />
      </Column>
    );
  }

  return (
    <Column fillWidth gap="16">
      <Row horizontal="space-between" vertical="center">
        <Heading as="h4" variant="heading-default-m">My Playlists</Heading>
        {!isCreating && (
          <Button variant="primary" prefixIcon="plus" size="s" onClick={() => setIsCreating(true)}>
            Create Playlist
          </Button>
        )}
      </Row>

      {isCreating && (
        <Row gap="8" vertical="center" fillWidth>
          <div style={{ flex: 1 }}>
            <Input
              id="new-playlist-input"
              label="Playlist name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter") handleCreate();
                if (e.key === "Escape") {
                  setIsCreating(false);
                  setNewTitle("");
                }
              }}
            />
          </div>
          <Button variant="primary" size="s" onClick={handleCreate}>
            Create
          </Button>
          <Button
            variant="tertiary"
            size="s"
            onClick={() => {
              setIsCreating(false);
              setNewTitle("");
            }}
          >
            Cancel
          </Button>
        </Row>
      )}

      {playlists.length === 0 && !isCreating ? (
        <Column fillWidth gap="12" paddingY="32" horizontal="center">
          <Text onBackground="neutral-weak" align="center">
            Create a playlist to organise your favourite movies and shows.
          </Text>
          <Button variant="secondary" prefixIcon="plus" onClick={() => setIsCreating(true)}>
            Create your first playlist
          </Button>
        </Column>
      ) : (
        <Column fillWidth gap="12">
          {playlists.map((playlist) => {
            const isExpanded = expandedId === playlist.id;
            return (
              <div key={playlist.id} className={styles.playlistCard}>
                <Row
                  horizontal="space-between"
                  vertical="center"
                  fillWidth
                  style={{ cursor: "pointer" }}
                  onClick={() => handleToggle(playlist.id)}
                >
                  <Column gap="2">
                    <Text weight="strong">{playlist.title}</Text>
                    <Text size="s" onBackground="neutral-weak">
                      {playlist.item_count} {playlist.item_count === 1 ? "item" : "items"}
                    </Text>
                  </Column>
                  <Row gap="4">
                    <IconButton
                      icon={isExpanded ? "chevronUp" : "chevronDown"}
                      size="s"
                      variant="ghost"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleToggle(playlist.id);
                      }}
                    />
                    <IconButton
                      icon="delete"
                      size="s"
                      variant="ghost"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        if (expandedId === playlist.id) setExpandedId(null);
                        deletePlaylist(playlist.id);
                      }}
                    />
                  </Row>
                </Row>

                {isExpanded && (
                  <div className={styles.itemList}>
                    {detailLoading ? (
                      <Column horizontal="center" paddingY="16">
                        <Spinner size="s" />
                      </Column>
                    ) : (expandedDetail?.items ?? []).length === 0 ? (
                      <Text
                        size="s"
                        onBackground="neutral-weak"
                        align="center"
                        paddingY="16"
                      >
                        No items yet — add from a movie or show detail view.
                      </Text>
                    ) : (
                      expandedDetail?.items?.map((item) => (
                        <div key={item.id} className={styles.itemCard}>
                          <img
                            src={
                              item.poster_path
                                ? getImageUrl(item.poster_path, "w92")
                                : "/images/cover.jpg"
                            }
                            alt={item.title}
                            className={styles.itemPoster}
                          />
                          <div className={styles.itemInfo}>
                            <Text weight="strong" size="s">
                              {item.title}
                            </Text>
                            <Text size="xs" onBackground="neutral-weak">
                              {item.release_date
                                ? new Date(item.release_date).getFullYear()
                                : "—"}
                              {item.vote_average
                                ? ` · ⭐ ${item.vote_average.toFixed(1)}`
                                : ""}
                            </Text>
                          </div>
                          <span className={styles.typeBadge}>{item.media_type}</span>
                          <IconButton
                            icon="close"
                            size="s"
                            variant="ghost"
                            onClick={() =>
                              removeFromPlaylist(playlist.id, item.tmdb_id, item.media_type)
                            }
                          />
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </Column>
      )}
    </Column>
  );
}
