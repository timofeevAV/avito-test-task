import { FilterAdvertisementOption } from '@/api/types';
import { Accordion } from '../common';

type FilterGroupProps = {
  label: string;
  name: string;
  options: FilterAdvertisementOption[];
  selectedValues: string[];
  onChange: (value: string) => void;
};

export default function FilterGroup({
  label,
  name,
  options,
  selectedValues,
  onChange,
}: FilterGroupProps) {
  return (
    <Accordion label={label}>
      <fieldset className="flex flex-col">
        {options.map((option) => (
          <div
            className="flex items-center gap-1"
            key={option.id}
          >
            <input
              type="radio"
              id={option.id}
              name={name}
              value={option.value}
              checked={selectedValues.includes(option.value.toString())}
              onChange={() => onChange(option.value.toString())}
            />
            <label htmlFor={option.id}>{option.label}</label>
          </div>
        ))}
      </fieldset>
    </Accordion>
  );
}
