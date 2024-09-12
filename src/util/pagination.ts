import { SetURLSearchParams } from 'react-router-dom';

export const changePage = (
  page: string | number,
  setSearchParams: SetURLSearchParams,
) => {
  setSearchParams((params) => {
    params.set('_page', page.toString());
    return params;
  });
};

export const changePerPage = (
  perPage: string | number,
  setSearchParams: SetURLSearchParams,
) => {
  setSearchParams((params) => {
    params.set('_per_page', perPage.toString());
    return params;
  });
};
