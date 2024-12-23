"use client";

import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  useFloating,
  shift,
  offset,
  flip,
  size,
  autoUpdate,
} from "@floating-ui/react-dom";
import { Flex, Dropdown } from ".";
import styles from "./DropdownWrapper.module.scss";

export interface DropdownWrapperProps {
  fillWidth?: boolean;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  trigger: ReactNode;
  dropdown: ReactNode;
  selectedOption?: string;
  style?: React.CSSProperties;
  className?: string;
  onSelect?: (value: string) => void;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const DropdownWrapper = forwardRef<HTMLDivElement, DropdownWrapperProps>(
  ({ trigger, dropdown, selectedOption, style, minHeight, className, onSelect, isOpen: controlledIsOpen, onOpenChange, minWidth, maxWidth, fillWidth }, ref) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

    const handleOpenChange = (newIsOpen: boolean) => {
      if (!isControlled) {
        setInternalIsOpen(newIsOpen);
      }
      onOpenChange?.(newIsOpen);
    };

    const {
      x,
      y,
      strategy,
      refs,
      update,
    } = useFloating({
      placement: "bottom-start",
      open: isOpen,
      middleware: [
        offset(4),
        flip(),
        shift(),
        size({
          apply({ availableWidth, availableHeight, elements }) {
            Object.assign(elements.floating.style, {
              width: (maxWidth || fillWidth) ? '100%' : 'auto',
              minWidth: minWidth ? `${minWidth}rem` : undefined,
              maxWidth: maxWidth ? `${maxWidth}rem` : `${availableWidth}px`,
              minHeight: `${Math.min(minHeight || 0)}px`,
              maxHeight: `${availableHeight}px`,
            });
          },
        }),
      ],
      whileElementsMounted: autoUpdate,
    });

    useImperativeHandle(ref, () => wrapperRef.current as HTMLDivElement);

    useEffect(() => {
      if (wrapperRef.current) {
        refs.setReference(wrapperRef.current);
      }
    }, [refs]);

    useEffect(() => {
      if (!mounted) {
        setMounted(true);
      }
    }, []);

    useEffect(() => {
      if (isOpen && mounted) {
        requestAnimationFrame(() => {
          if (dropdownRef.current) {
            refs.setFloating(dropdownRef.current);
            update();
          }
        });
      }
    }, [isOpen, mounted, refs, update]);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        handleOpenChange(false);
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.relatedTarget as Node)
      ) {
        handleOpenChange(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      wrapperRef.current?.addEventListener("focusout", handleFocusOut);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        wrapperRef.current?.removeEventListener("focusout", handleFocusOut);
      };
    }, []);

    return (
      <Flex
        transition="macro-medium"
        style={{ ...((minHeight && isOpen) ? { marginBottom: `${minHeight + 48}px` } : {}), ...style }}
        className={className}
        position="relative"
        ref={wrapperRef}
        onClick={() => handleOpenChange(!isOpen)}
        tabIndex={-1}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {trigger}
        {isOpen && (
          <Flex
            zIndex={1}
            className={styles.fadeIn}
            ref={dropdownRef}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            role="listbox"
          >
            <Dropdown
              selectedOption={selectedOption}
              onSelect={onSelect}
            >
              {dropdown}
            </Dropdown>
          </Flex>
        )}
      </Flex>
    );
  }
);

DropdownWrapper.displayName = "DropdownWrapper";

export { DropdownWrapper };