"use client";

import { useRef, useEffect, useState, type FC } from "react";
import { Avatar, Icon, Text } from "@once-ui/components";
import styles from "./UserMenu.module.scss";

interface UserMenuProps {
  username: string;
  onLogout: () => void;
}

export const UserMenu: FC<UserMenuProps> = ({ username, onLogout }) => {
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
        <Avatar value={initials} size="s" />
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
