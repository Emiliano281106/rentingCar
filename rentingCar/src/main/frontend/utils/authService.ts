import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import config from './config.json';

export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});

interface AuthenticationResult {
  AccessToken?: string;
  IdToken?: string;
  RefreshToken?: string;
  ExpiresIn?: number;
  TokenType?: string;
}


export const signIn = async (username: string, password: string): Promise<AuthenticationResult> => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH', // Note: Consider PKCE in production
    ClientId: config.clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };
  try {
    const command = new InitiateAuthCommand(params);
    const { AuthenticationResult } = await cognitoClient.send(command);
    if (AuthenticationResult) {
      sessionStorage.setItem('idToken', AuthenticationResult.IdToken || '');
      sessionStorage.setItem('accessToken', AuthenticationResult.AccessToken || '');
      sessionStorage.setItem('refreshToken', AuthenticationResult.RefreshToken || '');
      return AuthenticationResult;
    }
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signUp = async (email: string, password: string) => {
  const params = {
    ClientId: config.clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'custom:role', Value: 'USER' }, // Default role
    ],
  };
  try {
    const command = new SignUpCommand(params);
    const response = await cognitoClient.send(command);
    return response;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const confirmSignUp = async (username: string, code: string) => {
  const params = {
    ClientId: config.clientId,
    Username: username,
    ConfirmationCode: code,
  };
  try {
    const command = new ConfirmSignUpCommand(params);
    await cognitoClient.send(command);
    return true;
  } catch (error) {
    console.error('Error confirming sign up:', error);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  const params = {
    ClientId: config.clientId,
    Username: email,
  };
  try {
    const command = new ForgotPasswordCommand(params);
    const response = await cognitoClient.send(command);
    return response;
  } catch (error) {
    console.error('Error initiating forgot password:', error);
    throw error;
  }
};

export const confirmForgotPassword = async (email: string, code: string, newPassword: string) => {
  const params = {
    ClientId: config.clientId,
    Username: email,
    ConfirmationCode: code,
    Password: newPassword,
  };
  try {
    const command = new ConfirmForgotPasswordCommand(params);
    const response = await cognitoClient.send(command);
    return response;
  } catch (error) {
    console.error('Error confirming new password:', error);
    throw error;
  }
};

export const signOut = () => {
  sessionStorage.clear();
};