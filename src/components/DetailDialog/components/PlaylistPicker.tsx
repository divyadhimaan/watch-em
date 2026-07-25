"use client";

import type { Playlist } from "@app-types/User";
import styles from "../DetailDialog.module.scss";

type Props = {
  playlists: Playlist[];
  isAdding: boolean;
  onSelect: (playlistId: number) => void;
  onCreateNew: () => void;
};

export function PlaylistPicker({ playlists, isAdding, onSelect, onCreateNew }: Props) {
  return (
    <div className={styles.playlistPicker}>
      {playlists.map((p) => (
        <button
          key={p.id}
          className={styles.playlistOption}
          onClick={() => onSelect(p.id)}
          disabled={isAdding}
        >
          <span className={styles.playlistOptionLabel}>{p.title}</span>
          <span className={styles.playlistCount}>{p.item_count}</span>
        </button>
      ))}
      <div className={styles.pickerDivider} />
      <button className={styles.playlistOption} onClick={onCreateNew}>
        <span className={styles.playlistOptionLabel}>+ New playlist</span>
      </button>
    </div>
  );
}
