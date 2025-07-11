"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import classNames from "classnames";
import Image from "next/image";
import styles from "./Logo.module.scss";
import { SpacingToken } from "../types";
import { Flex } from ".";

const sizeMap: Record<string, SpacingToken> = {
  xs: "20",
  s: "24",
  m: "32",
  l: "40",
  xl: "48",
};

interface LogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  size?: "xs" | "s" | "m" | "l" | "xl";
  style?: React.CSSProperties;
  wordmark?: boolean;
  icon?: boolean;
  iconSrc?: string;
  wordmarkSrc?: string;
  href?: string;
  text?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = "m",
  wordmark = true,
  icon = true,
  href,
  iconSrc,
  wordmarkSrc,
  className,
  style,
  ...props
}) => {
  useEffect(() => {
    if (!icon && !wordmark) {
      console.warn(
        "Both 'icon' and 'wordmark' props are set to false. The logo will not render any content.",
      );
    }
  }, [icon, wordmark]);

  const iconHeight = `var(--static-space-${sizeMap[size]})`;

  const content = (
    <>
      {icon && !iconSrc && (
        <div
          style={{
            height: `var(--static-space-${sizeMap[size]})`,
          }}
          className={styles.icon}
        />
      )}
      {iconSrc && (
        <Image
          src={iconSrc}
          alt="Trademark Icon"
          height={0} // `auto` height via CSS var, but required dummy here
          width={0}  // `auto` width via CSS
          style={{
            height: iconHeight,
            width: "auto",
          }}
          priority
        />
      )}
      {wordmark && !wordmarkSrc && (
        <div
          style={{
            height: `var(--static-space-${sizeMap[size]})`,
          }}
          className={styles.type}
        />
      )}
      {wordmarkSrc && (
        <Image
          src={wordmarkSrc}
          alt="Trademark Wordmark"
          height={0}
          width={0}
          style={{
            height: iconHeight,
            width: "auto",
          }}
          priority
        />
      )}
    </>
  );
  

  return href ? (
    <Link
      className={classNames("radius-l", "display-flex", "fit-height", className)}
      style={style}
      href={href}
      aria-label="Trademark"
      {...props}
    >
      {content}
    </Link>
  ) : (
    <Flex
      className={classNames(className)}
      radius="l"
      fitHeight
      style={style}
      aria-label="Trademark"
    >
      {content}
    </Flex>
  );
};

Logo.displayName = "Logo";
export { Logo };