import styles from "./skeleton.module.scss";

export function CarouselSkeleton() {
  return (
    <div style={{ width: "100%", padding: "0" }}>
      <div className={styles.carouselSkeleton} />
    </div>
  );
}
