"use client";

import { Flex, Row } from "@once-ui/components";
import skeletonStyles from "@/components/Skeleton/skeleton.module.scss";
import listStyles from "./EntityList.module.scss";

const SKELETON_COUNT = 20;

function SkeletonItem() {
  return (
    <div
      className={listStyles.row}
      style={{
        border: "1px solid var(--neutral-alpha-medium)",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {/* Poster — same .posterWrap sizing, responsive via EntityList CSS */}
      <div className={listStyles.posterWrap}>
        <div className={skeletonStyles.shimmer} style={{ width: "100%", height: "100%" }} />
      </div>

      {/* Info */}
      <div className={listStyles.info}>
        <div className={skeletonStyles.entityTitle} />
        <div className={skeletonStyles.entityTitleShort} />
        <div className={skeletonStyles.entityMeta} style={{ marginTop: 4 }} />
        <div className={listStyles.overview} style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
          <div className={skeletonStyles.entityOverviewLine} style={{ width: "100%" }} />
          <div className={skeletonStyles.entityOverviewLine} style={{ width: "80%" }} />
        </div>
      </div>
    </div>
  );
}

export function EntityListSkeleton({ header }: { header?: string }) {
  return (
    <Flex direction="column" gap="m" paddingY="xl" paddingX="l" horizontal="center">
      {header && (
        <Row fillWidth style={{ maxWidth: 1100 }} paddingX="4">
          <div className={skeletonStyles.entityHeading} />
        </Row>
      )}

      <div className={listStyles.list}>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <SkeletonItem key={i} />
        ))}
      </div>
    </Flex>
  );
}
