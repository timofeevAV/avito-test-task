import { Outlet } from 'react-router-dom';
import Header from './header';

export default function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
