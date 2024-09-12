import clsx from 'clsx';
import { Button } from '../common';
import { useEffect, useState } from 'react';
import { priceOptions, likesOptions, viewsOptions } from '@/api/constants';
import { useSearchParams } from 'react-router-dom';
import FilterGroup from './filter-group';

interface FiltersSectionProps {
  isOpen: boolean;
  closeFilters: () => void;
}

export default function FiltersSection({
  isOpen,
  closeFilters,
}: FiltersSectionProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSortOptions, setSelectedSortOptions] = useState<string[]>([]);

  useEffect(() => {
    const currentSort = searchParams.get('_sort');
    if (currentSort) {
      setSelectedSortOptions(currentSort.split(','));
    }
  }, [searchParams]);

  const handleSortChange = (value: string) => {
    setSelectedSortOptions((prev) => {
      const isSelected = prev.includes(value);
      if (isSelected) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleSubmit = () => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);

      if (selectedSortOptions.length > 0) {
        newParams.set('_sort', selectedSortOptions.join(','));
      } else {
        newParams.delete('_sort');
      }

      newParams.set('_page', '1');

      return newParams;
    });
  };

  const handleReset = () => {
    setSelectedSortOptions([]);
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.delete('_sort');
      newParams.set('_page', '1');
      return newParams;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      closeFilters();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [closeFilters]);

  return (
    <section
      className={clsx(
        'fixed left-0 top-0 z-[100] flex h-screen max-h-screen flex-1 -translate-x-full flex-col gap-4 overflow-hidden bg-background px-4 pt-0 transition-transform duration-300 md:static md:left-auto md:top-auto md:z-auto md:h-auto md:flex-[0_0_25%] md:translate-x-0 md:bg-transparent',
        {
          ['w-full translate-x-0 !py-4']: isOpen,
        },
      )}
    >
      <div className="flex items-center justify-between md:hidden">
        <h2 className="font-bold uppercase">Фильтр</h2>
        <button
          className="inline-flex items-center gap-1 hover:opacity-80"
          onClick={closeFilters}
        >
          закрыть
        </button>
      </div>

      <form
        className="overflow-auto -md:grow [&>:not(:last-child)]:mb-4 [&>:not(:last-child)]:pb-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <FilterGroup
          label="Цена"
          name="price"
          options={priceOptions}
          selectedValues={selectedSortOptions}
          onChange={handleSortChange}
        />
        <FilterGroup
          label="Лайки"
          name="likes"
          options={likesOptions}
          selectedValues={selectedSortOptions}
          onChange={handleSortChange}
        />
        <FilterGroup
          label="Просмотры"
          name="views"
          options={viewsOptions}
          selectedValues={selectedSortOptions}
          onChange={handleSortChange}
        />

        <div className="sticky bottom-0 left-0 flex w-full flex-wrap gap-1">
          <Button
            className="h-auto grow text-xs uppercase"
            type="submit"
          >
            Применить
          </Button>
          <Button
            className="h-auto grow text-xs uppercase"
            type="reset"
            secondary
            onClick={handleReset}
          >
            Сбросить
          </Button>
        </div>
      </form>
    </section>
  );
}
