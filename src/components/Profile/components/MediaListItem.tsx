import { Text } from "@once-ui/components";
import { getImageUrl } from "@/utils/getImageUrl";
import styles from "./MediaListItem.module.scss";

interface MediaListItemProps {
  poster?: string | null;
  title: string;
  year?: number | string | null;
  rating?: number | null;
  watched?: boolean;
  /** "card" renders a bordered card shell; "item" is borderless (for nested lists) */
  variant?: "card" | "item";
  badges?: React.ReactNode;
  actions?: React.ReactNode;
}

export function MediaListItem({
  poster,
  title,
  year,
  rating,
  watched = false,
  variant = "card",
  badges,
  actions,
}: MediaListItemProps) {
  const shellClass =
    variant === "card"
      ? `${styles.card}${watched ? ` ${styles.cardWatched}` : ""}`
      : styles.item;

  const posterWrapClass =
    variant === "item"
      ? `${styles.posterWrap} ${styles.posterWrapSmall}`
      : styles.posterWrap;

  const subtitle = [
    year ? String(year) : "—",
    rating ? `⭐ ${rating.toFixed(1)}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className={shellClass}>
      <div className={posterWrapClass}>
        <img
          src={poster ? getImageUrl(poster, "w185") : "/images/cover.jpg"}
          alt={title}
          className={styles.poster}
        />
        {watched && <div className={styles.watchedOverlay}>✓</div>}
      </div>

      <div className={styles.info}>
        <div className={styles.titleRow}>
          <Text
            weight="strong"
            size={variant === "item" ? "s" : "m"}
            className={`${styles.title}${watched ? ` ${styles.titleMuted}` : ""}`}
          >
            {title}
          </Text>
          {badges}
        </div>
        <Text size={variant === "item" ? "xs" : "s"} onBackground="neutral-weak">
          {subtitle}
        </Text>
      </div>

      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
