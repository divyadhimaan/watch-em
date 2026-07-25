"use client";

import { getImageUrl } from "@/utils/getImageUrl";

type Props = {
  backdropPath: string;
  posterPath: string;
};

export function MovieBackdrop({ backdropPath, posterPath }: Props) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/7",
        overflow: "hidden",
        borderRadius: "var(--radius-l)",
        flexShrink: 0,
      }}
    >
      <img
        src={getImageUrl(backdropPath || posterPath, "w1280")}
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, var(--page-background) 100%)",
        }}
      />
    </div>
  );
}
