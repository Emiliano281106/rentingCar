import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../utils/authService';
import '../themes/carrenting/styles.css';
import { VerticalLayout, TextField, PasswordField, Button } from '@vaadin/react-components';

interface AuthenticationResult {
  AccessToken?: string;
  IdToken?: string;
  RefreshToken?: string;
  ExpiresIn?: number;
  TokenType?: string;
}

export const config: ViewConfig = {
  menu: { exclude: true },
  title: 'Login',
};

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('accessToken')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const AuthenticationResult = await signIn(username, password);
      if (AuthenticationResult?.AccessToken) {
        sessionStorage.setItem('accessToken', AuthenticationResult.AccessToken);
        sessionStorage.setItem('idToken', AuthenticationResult.IdToken || '');
        sessionStorage.setItem('refreshToken', AuthenticationResult.RefreshToken || '');
        sessionStorage.setItem('username', username); // Store username for drawer logic
        navigate('/listCars/bookingCar/FilterBookings');
      } else {
        throw new Error('No access token received');
      }
    } catch (error: any) {
      console.error('Sign-in failed:', error);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    handleSignIn(e as any);
  };

  return (
    <VerticalLayout className="min-h-screen flex flex-col items-center justify-center p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleSignIn} className="flex flex-col gap-4 w-full">
        <TextField
          label="Username"
          value={username}
          onValueChanged={(e) => setUsername(e.detail.value)}
          required
          className="w-full"
        />
        <PasswordField
          label="Password"
          value={password}
          onValueChanged={(e) => setPassword(e.detail.value)}
          required
          className="w-full"
        />
        <Button
          theme="primary"
          onClick={handleButtonClick}
          className="w-full"
        >
          Sign In
        </Button>
      </form>
    </VerticalLayout>
  );
}