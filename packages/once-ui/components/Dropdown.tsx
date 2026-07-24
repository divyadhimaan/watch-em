"use client";

import React, { ReactNode, forwardRef, SyntheticEvent, Children, isValidElement, cloneElement } from "react";
import { Column, Row } from ".";
import classNames from "classnames";
import styles from './Dropdown.module.scss';

interface DropdownProps extends Omit<React.ComponentProps<typeof Row>, "onSelect"> {
  selectedOption?: string;
  children?: ReactNode;
  onEscape?: () => void;
  onSelect?: (event: string) => void;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ selectedOption, className, children, onEscape, onSelect, ...flex }, ref) => {
    const handleSelect = (event: SyntheticEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      const value =
        target.getAttribute("data-value") ||
        target.closest("[data-value]")?.getAttribute("data-value");

      if (onSelect && value) {
        onSelect(value);
      }
    };

    // Wrap children to apply selected styles
    const renderedChildren = Children.map(children, (child) => {
      if (!isValidElement(child)) return child;

      const element = child as React.ReactElement<any>;
      const value = element.props["data-value"];
      const isSelected = selectedOption && value === selectedOption;

      return cloneElement(element, {
        className: classNames(element.props.className, styles.dropdownItem, {
          [styles.selected]: isSelected,
        }),
      });
    });

    return (
      <Row
        ref={ref}
        role="listbox"
        onClick={handleSelect}
        flex={1}
        className={classNames(styles.dropdown, className)}
        {...flex}
      >
        <Column flex={1} overflowY="auto" gap="1">
          {renderedChildren}
        </Column>
      </Row>
    );
  },
);

Dropdown.displayName = "Dropdown";

export { Dropdown };
export type { DropdownProps };
