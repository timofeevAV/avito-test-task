import { useDebounce } from '@/hooks';
import { useEffect, useState } from 'react';
import Input from './input';

interface SearchInputProps extends React.ComponentProps<'input'> {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function SearchInput({
  search,
  onSearchChange,
  ...props
}: SearchInputProps) {
  const [value, setValue] = useState(search);
  const debouncedValue = useDebounce(value, 150);

  useEffect(() => {
    onSearchChange(debouncedValue);
  }, [debouncedValue, onSearchChange]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Поиск..."
      {...props}
    />
  );
}
