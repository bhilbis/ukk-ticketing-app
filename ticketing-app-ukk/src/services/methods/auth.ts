/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import { AxiosError } from 'axios';
import { useAuth } from '@/context/AuthContext';

export const usePostRegister = () => {
  return useMutation({
    mutationFn: async (formData: Record<string, unknown>) => {
      const response = await axiosInstance.post('/auth/register', formData);
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      throw new Error(response.data?.message || 'Pendaftaran gagal');
    },
    onError: (error: Error) => {
      console.error("Registration failed:", error.message);
    },
  });
};

export const usePostLogin = () => {
  const {login} = useAuth();
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await axiosInstance.post('/auth/login', { email, password });
      if (response.status === 200 || response.status === 201) {
        const { user, token } = response.data;
        if (!user || !token) {
          throw new Error("Invalid response structure");
        }
        return { user, token };
      }
      throw new Error(response.data?.message || 'Login gagal');
    },
    onSuccess: (data) => {
      login(data.token);
    },
    onError: (error: AxiosError) => {
      const errorMessage = (error.response?.data as { message?: string })?.message;
      console.error("Login failed:", errorMessage || error.message);
    }
  });
};

export const useLogout = () => {
  const { logout } = useAuth();
  return useMutation({
    mutationFn: async () => {
      try {
        await axiosInstance.post('/auth/logout');
      } catch (error) {
        if (error instanceof AxiosError && error.response?.data?.message === "Unauthenticated.") {
          return;
        }
        throw error;
      }
    },
    onSuccess: () => {
      logout();
    },
    onMutate: () => {
      logout();
    },
    onError: (error: AxiosError) => {
      if (error.response?.status !== 401) {
        console.error("Logout error:", error);
      }
      logout();
    },
  });
};