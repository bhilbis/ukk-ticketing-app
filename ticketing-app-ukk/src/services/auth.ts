import axiosInstance from '@/lib/axiosInstance';
import axios from 'axios';

export const postRegister = async (formData: Record<string, unknown>) => {
  try {
    const response = await axiosInstance.post('/auth/register', formData);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Registration failed:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Pendaftaran gagal');
    } else {
      console.error("Registration failed:", error);
      throw new Error('Pendaftaran gagal');
    }
  }
}

export const postLogin = async (name: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      name,
      password,
    });

    if (response.status === 200 || response.status === 201) {
      const { user, token } = response.data;

      if (!user || !token) {
        throw new Error("Invalid response structure");
      }

      localStorage.setItem('token', token);

      return { user, token };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Login failed:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login gagal');
    } else {
      console.error("Login failed:", error);
      throw new Error('Login gagal');
    }
  }
};

export const Logout = async () => {
  try {
    await axiosInstance.post('/auth/logout');
    localStorage.removeItem('token');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Logout failed:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Logout gagal');
    } else {
      console.error("Logout failed:", error);
      throw new Error('Logout gagal');
    }
  }
}
