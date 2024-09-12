import { FilterOption } from '@/api/types';
import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';
import Icon from './icon';

type DropdownProps = {
  label?: string;
  options: FilterOption[];
  selectedValue: string | number;
  onChange: (value: string | number) => void;
  customLabelFormat?: (value: string | number) => string;
};

export default function Dropdown({
  label,
  options,
  selectedValue,
  onChange,
  customLabelFormat,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (value: string | number) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative z-[50] max-w-sm select-none lowercase"
      ref={dropdownRef}
    >
      <label
        className="flex cursor-pointer items-center gap-1 text-foreground"
        onClick={toggleDropdown}
      >
        <span>
          {label ??
            (customLabelFormat
              ? customLabelFormat(selectedValue)
              : options.find((option) => option.value == selectedValue)?.label)}
        </span>
        <Icon
          id="icon-arrow-down"
          className={clsx('transform transition-transform duration-300', {
            ['rotate-180']: isOpen,
          })}
        />
      </label>
      <div
        className={clsx(
          'absolute left-0 mt-2 max-h-0 overflow-hidden rounded-md border border-border bg-popover opacity-0 shadow-lg transition-all duration-300',
          {
            ['max-h-40 opacity-100']: isOpen,
          },
        )}
      >
        <ul className="flex max-h-40 flex-col overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className={clsx(
                'w-full cursor-pointer px-4 py-2 text-left text-sm lowercase text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                {
                  ['bg-secondary font-semibold text-accent-foreground']:
                    option.value == selectedValue,
                },
              )}
              onClick={() => handleOptionClick(option.value)}
            >
              <span>
                {customLabelFormat
                  ? customLabelFormat(option.value)
                  : option.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
