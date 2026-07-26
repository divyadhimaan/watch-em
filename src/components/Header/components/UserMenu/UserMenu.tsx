"use client";

import { useRef, useEffect, useState, type FC } from "react";
import { Avatar, Icon, Text } from "@once-ui/components";
import { resolveAvatarUrl } from "@/utils/getImageUrl";
import styles from "./UserMenu.module.scss";

interface UserMenuProps {
  username: string;
  avatarUrl?: string;
  onLogout: () => void;
}

export const UserMenu: FC<UserMenuProps> = ({ username, avatarUrl, onLogout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = username.slice(0, 2).toUpperCase();

  return (
    <div ref={ref} className={styles.wrapper}>
      <button className={styles.trigger} onClick={() => setOpen(!open)}>
        {avatarUrl ? (
          <img
            src={resolveAvatarUrl(avatarUrl)}
            alt={username}
            style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
          />
        ) : (
          <Avatar value={initials} size="s" />
        )}
        <Text variant="body-default-s">{username}</Text>
        <Icon name={open ? "chevronUp" : "chevronDown"} size="xs" />
      </button>

      {open && (
        <div className={styles.dropdown}>
          <button
            className={styles.item}
            onClick={() => { setOpen(false); window.location.href = "/profile"; }}
          >
            <Icon name="person" size="xs" />
            <Text variant="body-default-s">My Profile</Text>
          </button>
          <div className={styles.separator} />
          <button
            className={`${styles.item} ${styles.itemDanger}`}
            onClick={() => { setOpen(false); onLogout(); }}
          >
            <Icon name="close" size="xs" />
            <Text variant="body-default-s">Sign Out</Text>
          </button>
        </div>
      )}
    </div>
  );
};
