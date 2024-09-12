import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const links = [
  {
    href: '/',
    title: 'Объявления',
  },
  {
    href: '/orders',
    title: 'Заказы',
  },
];

export default function Header() {
  return (
    <header className="sticky left-0 top-0 z-[100] flex justify-center border-b border-current bg-background/20 backdrop-blur-md">
      <nav>
        <ul className="select-none space-x-2 px-4 py-3 lowercase">
          {links.map((l) => (
            <li
              key={l.href}
              className="inline"
            >
              <NavLink
                to={l.href}
                className={({ isActive }) => {
                  return clsx('pseudo-underline pseudo-underline--transition', {
                    ['pseudo-underline--show pointer-events-none text-accent-foreground']:
                      isActive,
                    ['text-muted-foreground']: !isActive,
                  });
                }}
              >
                {l.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
