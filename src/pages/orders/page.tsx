import { useGetOrders } from '@/api/api';
import type { Order } from '@/api/types';
import {
  Button,
  GridSkeleton,
  Section,
  GridItem,
  Pagination,
  Icon,
} from '@/components/common';
import { OrderCard } from '@/components/orders';
import FilterSection from '@/components/orders/filter-section';
import { changePage } from '@/util';
import { lazy, Suspense, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const LazyGrid = lazy(() => import('../../components/common/grid/grid'));

const filterOrdersByAdvertisementId = (
  orders: Order[],
  advertisementId: string,
) =>
  orders?.filter((order) =>
    order.items.some((item) => item.id === advertisementId),
  );

export default function OrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams({
    _page: '1',
    _per_page: '10',
  });
  const advertisementId = searchParams.get('advertisementId');

  const onFilterChange = (filters: { status?: string; _sort?: string }) => {
    setSearchParams((params) => {
      if (filters.status === '') {
        params.delete('status');
      } else {
        params.set('status', filters.status as string);
      }

      if (filters._sort === '') {
        params.delete('_sort');
      } else {
        params.set('_sort', filters._sort as string);
      }

      return params;
    });
  };

  const onResetFilters = () => {
    const resetParams = new URLSearchParams({
      _page: searchParams.get('_page') || '1',
      _per_page: searchParams.get('_per_page') || '10',
    });
    setSearchParams(resetParams);
  };

  const getSearchParamsIfHasAdvertisementId = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('_page');
    newParams.delete('_per_page');
    return newParams;
  };

  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useGetOrders(
    advertisementId ? getSearchParamsIfHasAdvertisementId() : searchParams,
  );

  const preparedOrders = useMemo(() => {
    return advertisementId
      ? filterOrdersByAdvertisementId(
          (orders || []) as Order[],
          advertisementId,
        )
      : orders?.data;
  }, [orders, advertisementId]);

  const renderOrders = () =>
    preparedOrders?.map((order) => (
      <GridItem
        key={order.id}
        className="bg-card p-4"
      >
        <OrderCard order={order} />
      </GridItem>
    ));

  const renderError = () => (
    <div className="flex flex-col items-center">
      <h2>Ошибка загрузки</h2>
      <Button onClick={() => refetch()}>Повторить</Button>
    </div>
  );

  const renderPagination = () =>
    !advertisementId && (
      <Pagination
        totalPages={orders?.pages ?? 0}
        currentPage={parseInt(searchParams.get('_page') || '1')}
        onPageChange={(page) => changePage(page, setSearchParams)}
      />
    );

  const hasFilters = useMemo(() => {
    return Array.from(searchParams.keys()).some(
      (key) => key !== '_page' && key !== '_per_page',
    );
  }, [searchParams]);

  return (
    <Section className="space-y-3">
      <h1>
        {advertisementId
          ? `Заказы с товаром "${advertisementId}":`
          : 'Все заказы:'}
      </h1>
      <div className="flex flex-wrap-reverse items-center justify-between">
        <FilterSection onFilterChange={onFilterChange} />
        {hasFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center lowercase text-accent-foreground hover:opacity-80"
          >
            <Icon id="icon-cross" />
            Сбросить фильтры
          </button>
        )}
      </div>
      <Suspense fallback={<GridSkeleton />}>
        <LazyGrid className="divide-y divide-border">
          {isLoading ? <GridSkeleton /> : renderOrders()}
        </LazyGrid>
        {renderPagination()}
      </Suspense>
      {isError && renderError()}
    </Section>
  );
}
