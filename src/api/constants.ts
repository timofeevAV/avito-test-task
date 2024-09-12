import { FilterAdvertisementOption, FilterOption } from './types';

export const statusOptions: FilterOption[] = [
  { label: 'все', value: '' },
  { label: 'Создан', value: 0 },
  { label: 'Оплачен', value: 1 },
  { label: 'Транспортировка', value: 2 },
  { label: 'Доставлен в пункт выдачи', value: 3 },
  { label: 'Получен', value: 4 },
  { label: 'Архив', value: 5 },
  { label: 'Возврат', value: 6 },
];

export const totalOptions: FilterOption[] = [
  { label: 'По умолчанию', value: '' },
  { label: 'По возрастанию', value: 'total' },
  { label: 'По убыванию', value: '-total' },
];

export const perPageOptions: FilterOption[] = [
  {
    value: '10',
  },
  {
    value: '20',
  },
  {
    value: '30',
  },
];

export const priceOptions: FilterAdvertisementOption[] = [
  { id: 'price-asc', value: 'price', label: 'По возрастанию' },
  { id: 'price-desc', value: '-price', label: 'По убыванию' },
];

export const likesOptions: FilterAdvertisementOption[] = [
  { id: 'likes-asc', value: 'likes', label: 'По возрастанию' },
  { id: 'likes-desc', value: '-likes', label: 'По убыванию' },
];

export const viewsOptions: FilterAdvertisementOption[] = [
  { id: 'views-asc', value: 'views', label: 'По возрастанию' },
  { id: 'views-desc', value: '-views', label: 'По убыванию' },
];
