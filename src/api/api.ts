import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import type {
  AdvertisementsResponse,
  Advertisement,
  OrdersResponse,
  Order,
} from './types';

const API_URL = 'http://localhost:3000';

const fetcher = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Error: ${res.statusText}`);
  }
  return res.json();
};

// Advertisements
export const useGetAdvertisements = (params?: URLSearchParams) => {
  const queryString = params ? `?${params.toString()}` : '';

  return useQuery<AdvertisementsResponse>({
    queryKey: ['advertisements', queryString],
    queryFn: () => fetcher(`${API_URL}/advertisements${queryString}`),
  });
};

export const useGetAdvertisementById = (id: string) => {
  return useQuery({
    queryKey: ['advertisement', id],
    queryFn: () => fetcher(`${API_URL}/advertisements/${id}`),
  });
};

export const useCreateAdvertisement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newAd: Partial<Advertisement>) =>
      fetcher(`${API_URL}/advertisements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAd),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements'] });
    },
  });
};

export const useUpdateAdvertisement = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedAd: Partial<Advertisement>) =>
      fetcher(`${API_URL}/advertisements/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAd),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisement', id] });
      queryClient.invalidateQueries({ queryKey: ['advertisements'] });
    },
  });
};

export const useDeleteAdvertisement = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      fetcher(`${API_URL}/advertisements/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements'] });
    },
  });
};

// Orders
export const useGetOrders = (params?: URLSearchParams) => {
  const queryString = params ? `?${params.toString()}` : '';
  return useQuery<OrdersResponse>({
    queryKey: ['orders', queryString],
    queryFn: () => fetcher(`${API_URL}/orders${queryString}`),
  });
};

export const useGetOrderById = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => fetcher(`${API_URL}/orders/${id}`),
  });
};

export const useUpdateOrder = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedOrder: Partial<Order>) =>
      fetcher(`${API_URL}/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOrder),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order', id] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useDeleteOrder = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => fetcher(`${API_URL}/orders/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
