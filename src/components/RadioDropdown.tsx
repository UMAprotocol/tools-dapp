"use client";

import Chevron from "@/icons/chevron.svg";
import type { DropdownItem } from "@/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./RadioDropdown.module.css";

interface Props {
  items: DropdownItem[];
  selected: DropdownItem | undefined;
  onSelect: (item: DropdownItem) => void;
  disabled?: boolean;
  id?: string;
}
export function RadioDropdown({
  items,
  selected,
  onSelect,
  disabled,
  id,
}: Props) {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        id={id}
        disabled={disabled}
        className={styles.trigger}
      >
        {selected?.label ?? (
          <span className={styles.placeholder}>Select option</span>
        )}
        <Chevron className={styles.chevron} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          side="bottom"
          sideOffset={4}
          className={styles.content}
        >
          {items.map((item) => (
            <DropdownMenu.RadioItem
              value={item.value}
              onSelect={() => onSelect(item)}
              key={item.value}
              className={styles.item}
            >
              {item.label}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
