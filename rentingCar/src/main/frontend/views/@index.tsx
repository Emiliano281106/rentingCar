import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { VerticalLayout, Button } from '@vaadin/react-components';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../utils/authService.js';
import '../themes/carrenting/styles.css';

export const config: ViewConfig = {
  menu: { order: 0, icon: 'line-awesome/svg/home-solid.svg' },
  title: 'Home',
};

export default function HomeView() {
  const navigate = useNavigate();
  const isLoggedIn = !!sessionStorage.getItem('accessToken');

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <VerticalLayout className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Car Renting</h1>
      <p className="text-lg mb-6">A simple app where you rent cars</p>
      {isLoggedIn ? (
        <Button theme="primary" className="w-48" onClick={handleSignOut}>
          Sign Out
        </Button>
      ) : (
        <Button theme="primary" className="w-48" onClick={() => navigate('/login')}>
          Sign In
        </Button>
      )}
    </VerticalLayout>
  );
}
