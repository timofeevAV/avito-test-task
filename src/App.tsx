import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './components/layout';
import { AdvertisementsPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <AdvertisementsPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
