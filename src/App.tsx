import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './components/layout';
import { AdvertisementsPage, AdvertisementDetails, OrdersPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <AdvertisementsPage />,
      },
      {
        path: 'advertisement/:id',
        element: <AdvertisementDetails />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
