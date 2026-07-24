"use client";

import { useState, type FC } from "react";
import { Flex, ToggleButton, Dropdown } from "@once-ui/components";
import styles from "./UserMenu.module.scss";

interface UserMenuProps {
  username: string;
  onLogout: () => void;
}

export const UserMenu: FC<UserMenuProps> = ({ username, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Flex
      background="surface"
      border="neutral-medium"
      radius="m-4"
      shadow="l"
      padding="4"
      horizontal="center"
    >
      <ToggleButton
        prefixIcon="person"
        suffixIcon="chevronDown"
        label={`Hello, ${username}`}
        selected={false}
        onClick={() => setShowDropdown(!showDropdown)}
      />
      {showDropdown && (
        <Dropdown
          className={styles.dropdownMenu}
          onSelect={(option) => {
            setShowDropdown(false);
            if (option === "profile") window.location.href = "/profile";
            if (option === "logout") onLogout();
          }}
        >
          <div data-value="profile" className={styles.dropdownItem}>My Profile</div>
          <div data-value="logout" className={styles.dropdownItem}>Logout</div>
        </Dropdown>
      )}
    </Flex>
  );
};