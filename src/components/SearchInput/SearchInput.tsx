"use client";

import { useState, useRef, useEffect, type FC } from "react";
import { Flex, Input, IconButton, Icon, ToggleButton } from "@once-ui/components";
import styles from "./SearchInput.module.scss";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onExpandChange?: (expanded: boolean) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ value, onChange, onExpandChange }) => {
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (expanded) inputRef.current?.focus();
  }, [expanded]);

  const handleExpand = () => {
    setExpanded(true);
    onExpandChange?.(true);
  };

  const handleBlur = () => {
    setExpanded(false);
    onExpandChange?.(false);
  };

  const handleClear = () => onChange("");

  return (
    <Flex className={`${styles.wrapper} ${expanded ? styles.expanded : styles.collapsed}`}>
      {!expanded ? (
        <ToggleButton prefixIcon="search" onClick={handleExpand} selected={false} />
      ) : (
        <Input
          id="input-search"
          label=""
          height="s"
          labelAsPlaceholder
          ref={inputRef}
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          hasPrefix={<Icon name="search" size="xs" />}
          hasSuffix={
            value.length > 0 ? (
              <IconButton variant="ghost" icon="close" size="s" onClick={handleClear} />
            ) : null
          }
          className={styles.input}
          onBlur={handleBlur}
        />
      )}
    </Flex>
  );
};