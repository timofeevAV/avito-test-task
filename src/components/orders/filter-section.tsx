import { useState } from 'react';
import Dropdown from '../common/dropdown';
import { useSearchParams } from 'react-router-dom';
import { statusOptions, totalOptions } from '@/api/constants';

export default function FilterSection({
  onFilterChange,
}: {
  onFilterChange: (filters: { status?: string; _sort?: string }) => void;
}) {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(searchParams.get('status') ?? '');
  const [sort, setSort] = useState(searchParams.get('_sort') ?? '');

  return (
    <div className="flex gap-4">
      <Dropdown
        label="Статус"
        options={statusOptions}
        selectedValue={status}
        onChange={(value) => {
          setStatus(value.toString());
          onFilterChange({ status: value.toString(), _sort: sort });
        }}
      />
      <Dropdown
        label="Цена"
        options={totalOptions}
        selectedValue={sort}
        onChange={(value) => {
          setSort(value.toString());
          onFilterChange({ status, _sort: value.toString() });
        }}
      />
    </div>
  );
}
