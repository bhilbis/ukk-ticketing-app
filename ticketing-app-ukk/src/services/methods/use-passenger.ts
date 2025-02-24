/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';

export interface UserP {
  avatar: File | string;
  name_passenger: string;
  address: string;
  telp: string;
  gender: string;
  birth: string;
}

// Fetch user data
export const useGetMy = (enabled: boolean) => {
  return useQuery({ queryKey: ['user'], queryFn: async () => {
    const response = await axiosInstance.get('/myUser');
    return response.data;
  },
  enabled,
});
};

// Update user data
export const useUpdateMy = () => {
  return useMutation({

    mutationFn: async (formData: FormData) => {
      // First, create a copy of the FormData for the POST request
      const postFormData = new FormData();
      formData.forEach((value, key) => {
        postFormData.append(key, value);
      });

      // Add _method field to indicate this is actually a PUT request
      formData.append('_method', 'PUT');

      const response = await axiosInstance.post('/myUser/update-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    }
  });
};

// Update password
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (passwordData: any) => {
      const response = await axiosInstance.put('/myUser/update-password', passwordData);
      return response.data;
    }
  });
};
