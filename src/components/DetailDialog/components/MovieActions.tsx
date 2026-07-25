"use client";

import { Button } from "@once-ui/components";
import type { Playlist } from "@app-types/User";
import { PlaylistPicker } from "./PlaylistPicker";
import styles from "../DetailDialog.module.scss";

type Props = {
  inWatchlist: boolean;
  isFavourite: boolean;
  showPlaylistPicker: boolean;
  playlists: Playlist[];
  isAdding: boolean;
  onWatchlist: () => void;
  onFavourite: () => void;
  onPlaylistButtonClick: () => void;
  onPlaylistSelect: (playlistId: number) => void;
  onCreateNewPlaylist: () => void;
};

export function MovieActions({
  inWatchlist,
  isFavourite,
  showPlaylistPicker,
  playlists,
  isAdding,
  onWatchlist,
  onFavourite,
  onPlaylistButtonClick,
  onPlaylistSelect,
  onCreateNewPlaylist,
}: Props) {
  return (
    <div className={styles.actions}>
      <Button
        variant={inWatchlist ? "secondary" : "primary"}
        prefixIcon={inWatchlist ? "check" : "plus"}
        onClick={onWatchlist}
      >
        {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
      </Button>

      <Button
        variant={isFavourite ? "primary" : "secondary"}
        prefixIcon="star"
        onClick={onFavourite}
      >
        {isFavourite ? "Favourited" : "Favourite"}
      </Button>

      <div style={{ position: "relative" }}>
        <Button
          variant={showPlaylistPicker ? "primary" : "secondary"}
          prefixIcon="list"
          onClick={onPlaylistButtonClick}
        >
          Add to Playlist
        </Button>
        {showPlaylistPicker && (
          <PlaylistPicker
            playlists={playlists}
            isAdding={isAdding}
            onSelect={onPlaylistSelect}
            onCreateNew={onCreateNewPlaylist}
          />
        )}
      </div>
    </div>
  );
}
