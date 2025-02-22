// payment-method.ts (API hooks)
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

export interface PaymentMethod {
  id?: number;
  type: 'credit_card' | 'bank_transfer' | 'e-wallet' | 'cash';
  account_number?: string;
  bank_name?: string;
}

export const usePaymentMethods = () => {
  return useQuery<PaymentMethod[]>({
    queryKey: ['payment-methods'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/payment-methods');
      return data.data;
    },
  });
};

export const useCreatePaymentMethod = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (formData: PaymentMethod) => 
      axiosInstance.post('/payment-methods', formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
    }
  });
};

export const useUpdatePaymentMethod = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: PaymentMethod }) => 
      axiosInstance.put(`/payment-methods/${id}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
    }
  });
};

export const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => 
      axiosInstance.delete(`/payment-methods/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
    }
  });
};