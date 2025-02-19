// import axiosInstance from '@/lib/axiosInstance';
// import axios from 'axios';

// export const postRegister = async (formData: Record<string, unknown>) => {
//   try {
//     const response = await axiosInstance.post('/auth/register', formData);

//     if (response.status === 200 || response.status === 201) {
//       return response.data;
//     }

//     return response;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error("Registration failed:", error.response?.data || error.message);
//       throw new Error(error.response?.data?.message || 'Pendaftaran gagal');
//     } else {
//       console.error("Registration failed:", error);
//       throw new Error('Pendaftaran gagal');
//     }
//   }
// }

// export const postLogin = async (email: string, password: string) => {
//   try {
//     const response = await axiosInstance.post('/auth/login', {
//       email,
//       password,
//     });

//     if (response.status === 200 || response.status === 201) {
//       const { user, token } = response.data;

//       if (!user || !token) {
//         throw new Error("Invalid response structure");
//       }
//       localStorage.setItem('token', token);
//       console.log(token)

//       return { user, token };
//     }
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       console.error("Login failed:", error.response?.data || error.message);
//       throw new Error(error.response?.data?.message || 'Login gagal');
//     } else {
//       console.error("Login failed:", error);
//       throw new Error('Login gagal');
//     }
//   }
// };

// export const Logout = async () => {
//   try {
//     await axiosInstance.post('/auth/logout');
//     localStorage.removeItem('token');
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       console.error("Logout failed:", error.response?.data || error.message);
//       throw new Error(error.response?.data?.message || 'Logout gagal');
//     } else {
//       console.error("Logout failed:", error);
//       throw new Error('Logout gagal');
//     }
//   }
// }

import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import { AxiosError } from 'axios';

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
      localStorage.setItem('token', data.token);
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        await axiosInstance.post('/auth/logout');
      } catch (error) {
        // Jika terjadi error Unauthenticated, kita anggap berhasil logout
        if (error instanceof AxiosError && error.response?.data?.message === "Unauthenticated.") {
          
          return;
        }
        throw error; // Throw error lain jika bukan Unauthenticated
      }
    },
    onSuccess: () => {
      localStorage.removeItem('token');
    },
    onMutate: () => {
      localStorage.removeItem('token');
    },
    onError: (error: AxiosError) => {
      // Hanya log error jika bukan Unauthenticated
      const errorMessage = (error.response?.data as { message?: string })?.message;
        if (errorMessage !== "Unauthenticated.") {
          console.error("Logout failed:", errorMessage || error.message);
        }
    },
  });
};