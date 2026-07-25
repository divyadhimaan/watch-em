import styles from "./Pill.module.scss";

type PillVariant = "neutral" | "vibe" | "rating";
type PillSize = "s" | "m" | "l";

interface PillProps {
  variant?: PillVariant;
  size?: PillSize;
  className?: string;
  children: React.ReactNode;
}

export function Pill({ variant = "neutral", size = "s", className, children }: PillProps) {
  return (
    <span className={[styles.pill, styles[variant], styles[size], className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
