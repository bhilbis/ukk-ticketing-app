/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';

// Fetch user data
export const useGetMy = () => {
  return useQuery({ queryKey: ['user'], queryFn: async () => {
    const response = await axiosInstance.get('/myUser');
    return response.data;
  }});
};

// Update user data
export const useUpdateMy = () => {
  return useMutation({
    mutationFn: async (userData: any) => {
      const response = await axiosInstance.put('/myUser/update-user', userData);
      return response.data;
    }
  });
};

// Update password
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (passwordData: any) => {
      const response = await axiosInstance.post('/myUser/update-password', passwordData);
      return response.data;
    }
  });
};
