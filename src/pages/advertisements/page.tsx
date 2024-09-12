import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useGetAdvertisements, useCreateAdvertisement } from '@/api/api';
import {
  AdvertisementCard,
  AdvertisementForm,
} from '@/components/advertisements';
import {
  Button,
  Dialog,
  GridItem,
  GridSkeleton,
  Icon,
  Pagination,
  Input,
} from '@/components/common';
import type {
  AdvertisementFormValues,
  ResetForm,
} from '@/components/advertisements/advertisement-form';
import Dropdown from '@/components/common/dropdown';
import { perPageOptions } from '@/api/constants';
import { changePage, changePerPage } from '@/util';
import FiltersSection from '@/components/advertisements/filters-section';
import { useDebounce } from '@/hooks';
import { Advertisement } from '@/api/types';

const LazyGrid = lazy(() => import('@/components/common/grid/grid'));

export default function AdvertisementsPage() {
  const [searchParams, setSearchParams] = useSearchParams({
    _page: '1',
    _per_page: '10',
    q: '',
  });
  const q = searchParams.get('q');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 500).trim();

  const getSearchParamsIfHasQ = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('q');
    newParams.delete('_page');
    newParams.delete('_per_page');

    return newParams;
  };

  const {
    data: advertisements,
    isError,
    isLoading,
    refetch,
  } = useGetAdvertisements(q ? getSearchParamsIfHasQ() : searchParams);

  const createAdvertisement = useCreateAdvertisement();

  const handleAdvertisementCreate = (
    values: AdvertisementFormValues,
    resetForm: ResetForm,
  ) => {
    const newAdvertisement = {
      ...values,
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString(),
    };

    createAdvertisement.mutate(newAdvertisement, {
      onSuccess: () => {
        resetForm();
        handleDialogClose();
      },
    });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleFiltersClose = () => {
    setFiltersOpen(false);
  };

  const preparedAdvertisements = useMemo(() => {
    const filterAdvertisementByName = (advertisements: Advertisement[]) =>
      advertisements.filter((ad) =>
        ad.name.toLowerCase().includes(q?.toLowerCase() as string),
      );

    return q
      ? filterAdvertisementByName((advertisements || []) as Advertisement[])
      : advertisements?.data;
  }, [advertisements, q]);

  useEffect(() => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('q', debouncedQuery);
      return newParams;
    });
  }, [debouncedQuery, setSearchParams]);

  return (
    <>
      <div className="mt-10 space-y-5">
        <Input
          placeholder="Поиск объявлений"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="!mx-auto w-full max-w-96"
        />
        <div className="flex items-center justify-between px-4">
          <div className="flex gap-2">
            <button
              className="inline-flex items-center gap-1 hover:opacity-80 md:hidden"
              onClick={() => {
                setFiltersOpen(!isFiltersOpen);
              }}
            >
              фильтр
              <Icon id="icon-plus" />
            </button>
            <Dropdown
              options={perPageOptions}
              onChange={(value) => {
                changePerPage(value, setSearchParams);
              }}
              selectedValue={searchParams.get('_per_page') || '10'}
              customLabelFormat={(value) => `Показывать по: ${value}`}
            />
          </div>

          <Button
            onClick={handleDialogOpen}
            iconLeft={<Icon id="icon-plus" />}
          >
            <span className="hidden sm:inline">Создать объявление</span>
          </Button>
        </div>

        <div className="flex">
          <FiltersSection
            isOpen={isFiltersOpen}
            closeFilters={handleFiltersClose}
          />
          <div className="flex-1 space-y-4 md:flex-[0_0_75%]">
            {isError ? (
              <div className="flex flex-col items-center">
                <h2>Ошибка загрузки</h2>
                <Button onClick={() => refetch()}>Повторить</Button>
              </div>
            ) : isLoading ? (
              <GridSkeleton />
            ) : (
              <Suspense
                fallback={<GridSkeleton />}
                key={searchParams.toString()}
              >
                <LazyGrid className="grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {preparedAdvertisements?.map((advertisement) => (
                    <GridItem
                      key={advertisement.id}
                      className="aspect-square bg-secondary"
                    >
                      <AdvertisementCard advertisement={advertisement} />
                    </GridItem>
                  ))}
                </LazyGrid>
                {!q && (
                  <Pagination
                    totalPages={advertisements?.pages ?? 0}
                    currentPage={parseInt(searchParams.get('_page') || '1')}
                    onPageChange={(page) => {
                      changePage(page, setSearchParams);
                    }}
                  />
                )}
              </Suspense>
            )}
          </div>
        </div>
      </div>
      <Dialog
        isOpen={isDialogOpen}
        closeDialog={handleDialogClose}
      >
        <Dialog.Title>Создание объявления</Dialog.Title>
        <AdvertisementForm
          handleSubmit={handleAdvertisementCreate}
          submitButtonText="Создать"
        />
        <Button
          type="button"
          className="mt-2 w-full"
          secondary
          onClick={handleDialogClose}
        >
          Отмена
        </Button>
      </Dialog>
    </>
  );
}
