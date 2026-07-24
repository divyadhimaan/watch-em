import {
  Text,
  Logo,
  Background,
  Column,
  Row,
  Line,
} from "@once-ui/components";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Column
      as="footer"
      position="relative"
      fillWidth
      horizontal="center"
      paddingX="l"
      paddingTop="80"
      paddingBottom="64"
      className={styles.footer}
    >
      <Background
        borderTop="brand-alpha-medium"
        mask={{ x: 50, y: 0 }}
        position="absolute"
        grid={{
          display: true,
          opacity: 20,
          width: "0.25rem",
          color: "neutral-alpha-weak",
          height: "0.25rem",
        }}
      />

      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <Text className={styles.tagline} variant="body-default-s">
            Discover, organize, and share the movies you love — all in one place.
          </Text>
        </div>

        <Line background="neutral-alpha-medium" />

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <Text variant="body-default-xs">
            © {year} Watch&apos;em. All rights reserved.
          </Text>
          <Row gap="4" vertical="center" textVariant="body-default-xs">
            Made with <span aria-hidden>♥</span> by Divya
          </Row>
        </div>
      </div>
    </Column>
  );
};
