import { useMutation } from '@tanstack/react-query';
import api from '../lib/axios';
import { useAuth as useAuthContext } from '../contexts/AuthContext';
import type { AuthResponse, LoginCredentials, SignupCredentials } from '@feedback-system/shared';

export function useLogin() {
  const { login } = useAuthContext();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      login(data.user, data.tokens);
    },
  });
}

export function useSignup() {
  const { login } = useAuthContext();

  return useMutation({
    mutationFn: async (credentials: SignupCredentials) => {
      const { data } = await api.post<AuthResponse>('/auth/signup', credentials);
      return data;
    },
    onSuccess: (data) => {
      login(data.user, data.tokens);
    },
  });
}

export function useLogout() {
  const { logout } = useAuthContext();

  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: () => {
      logout();
    },
  });
}
