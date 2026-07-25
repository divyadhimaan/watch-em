"use client";

import { useState } from "react";
import { Dialog, Column, Row, Button, Input } from "@once-ui/components";

type Props = {
  isOpen: boolean;
  movieTitle: string;
  onClose: () => void;
  onConfirm: (name: string) => Promise<void>;
};

export function CreatePlaylistDialog({ isOpen, movieTitle, onClose, onConfirm }: Props) {
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleClose = () => {
    setName("");
    onClose();
  };

  const handleConfirm = async () => {
    if (!name.trim() || isCreating) return;
    setIsCreating(true);
    try {
      await onConfirm(name.trim());
      setName("");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="New playlist"
      description={movieTitle ? `"${movieTitle}" will be added automatically.` : ""}
    >
      <Column gap="16" paddingX="4" paddingBottom="8">
        <Input
          id="create-playlist-name"
          label="Playlist name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") handleConfirm();
          }}
        />
        <Row gap="12" horizontal="end">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={!name.trim() || isCreating}
          >
            {isCreating ? "Creating…" : "Create & Add"}
          </Button>
        </Row>
      </Column>
    </Dialog>
  );
}
