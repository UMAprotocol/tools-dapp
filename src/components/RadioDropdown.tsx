import Chevron from "@/icons/chevron.svg";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type DropdownItem = {
  label: string;
  value: string;
};

interface Props {
  items: DropdownItem[];
  selected: DropdownItem | undefined;
  onSelect: (item: DropdownItem) => void;
  disabled?: boolean;
}
export function RadioDropdown({ items, selected, onSelect, disabled }: Props) {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger disabled={disabled}>
        {selected?.label ?? "Select option"}
        <Chevron />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          {items.map((item) => (
            <DropdownMenu.RadioItem
              value={item.value}
              onSelect={() => onSelect(item)}
              key={item.value}
            >
              {item.label}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
