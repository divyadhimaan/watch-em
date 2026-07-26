'use client';

import { Column, Row } from "@once-ui/components";
import styles from "@/components/Skeleton/skeleton.module.scss";

export function ProfileSkeleton() {
  return (
    <Column fillWidth paddingY="xl" paddingX="l" flex={1} paddingBottom="80">
      <Row horizontal="center" paddingX="16" paddingY="32" fillWidth>
        <Column maxWidth="xl" fillWidth gap="-1">
          <Column
            background="page"
            radius="l"
            overflow="hidden"
            position="relative"
            fillWidth
            border="neutral-medium"
          >
            {/* Cover banner */}
            <div className={styles.profileCover} />

            {/* Avatar — overlaps cover bottom */}
            <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              <div
                className={styles.profileAvatar}
                style={{ marginTop: "-48px" }}
              />
            </div>

            <Column paddingX="16" paddingBottom="48" fillWidth gap="20" horizontal="center">
              {/* Username */}
              <div className={styles.profileUsername} />

              {/* Country */}
              <div className={styles.profileCountry} />

              {/* Tab bar */}
              <div className={styles.profileTabBar} />

              {/* Card body */}
              <Column fillWidth gap="16" style={{ maxWidth: "720px" }}>
                <div
                  style={{
                    border: "1px solid var(--neutral-border-medium)",
                    borderRadius: "12px",
                    padding: "24px",
                    width: "100%",
                  }}
                >
                  <Column gap="20" fillWidth>
                    {/* Card header row */}
                    <Row horizontal="space-between" vertical="center" fillWidth>
                      <div className={styles.profileCardTitle} />
                      <div className={styles.profileCardButton} />
                    </Row>

                    {/* Divider */}
                    <div className={styles.profileDivider} />

                    {/* Bio lines */}
                    <Column fillWidth style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div className={styles.profileTextLine} style={{ width: "100%" }} />
                      <div className={styles.profileTextLine} style={{ width: "85%" }} />
                      <div className={styles.profileTextLine} style={{ width: "60%" }} />
                    </Column>

                    {/* Detail rows */}
                    <Column fillWidth style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <Row gap="12" vertical="center">
                        <div className={styles.profileIcon} />
                        <div className={styles.profileTextLine} style={{ width: "120px" }} />
                      </Row>
                      <Row gap="12" vertical="center">
                        <div className={styles.profileIcon} />
                        <div className={styles.profileTextLine} style={{ width: "90px" }} />
                      </Row>
                    </Column>
                  </Column>
                </div>
              </Column>
            </Column>
          </Column>
        </Column>
      </Row>
    </Column>
  );
}
