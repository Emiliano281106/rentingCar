import { createMenuItems } from '@vaadin/hilla-file-router/runtime.js';
import { AppLayout, DrawerToggle, Icon, SideNav, SideNavItem } from '@vaadin/react-components';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import '../themes/carrenting/styles.css';

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = createMenuItems().filter(item => item.title !== 'Home');

  useEffect(() => {
    if (!sessionStorage.getItem('accessToken') && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [navigate, location.pathname]);

  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-m">
        <header className="flex flex-col gap-m">
          <div
            className="font-semibold text-l cursor-pointer text-left hover:underline"
            onClick={() => navigate('/')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
          >
            CarRenting
          </div>
          <SideNav onNavigate={({ path }) => navigate(path!)} location={location}>
            {menuItems.map(({ to, title, icon }) => (
              <SideNavItem path={to} key={to}>
                {icon ? <Icon src={icon} slot="prefix" /> : null}
                {title}
              </SideNavItem>
            ))}
          </SideNav>
        </header>
      </div>

      <DrawerToggle slot="navbar" aria-label="Menu toggle" />
      <h1 slot="navbar" className="text-l m-0">
        {/* Optionally, you can put a static or dynamic title here */}
      </h1>

      <Suspense>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
