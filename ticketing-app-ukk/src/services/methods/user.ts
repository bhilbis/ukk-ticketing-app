import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
export interface UserProps {
    id: number;
    name: string;
    username: string;
    email: string;
    level_id: number;
}
export const useGetUsers = () => {
  return useQuery<UserProps[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/users');
      return data.data;
    }
  });
};

export const useGetUserById = (id: number) => {
  return useQuery<UserProps>({
    queryKey: ['users', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/users/${id}`);
      return data.data;
    },
    enabled: !!id
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async(user: UserProps) => {
      if (user.id){
        axiosInstance.put(`/users/${user.id}`, user);
      } else {
        return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async(id: number) => {
      return axiosInstance.delete(`/users/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {

    }
  });
};

export const useCreateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async(user: UserProps) => {
      return axiosInstance.post('/users/create-staff', user)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};