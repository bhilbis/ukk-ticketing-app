// usePayment.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

export interface Payment {
    id: number;
    booking_id: string;
    payment_method_id: number;
    amount: number;
}

export const usePayment = () => {
  const queryClient = useQueryClient();

  const getPayments = useQuery<Payment[]>({
    queryKey: ['payments'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/payments');
      return data.data;
    }
  });

  const processPayment = useMutation({
    mutationFn: (payload: { 
      booking_id: number; 
      payment_method_id: number;
      amount: string 
    }) => axiosInstance.post('/payments', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    }
  });

  const cancelBooking = useMutation({
    mutationFn: (bookingId: number) => 
      axiosInstance.put(`/bookings/${bookingId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    }
  });

  return {
    getPayments,
    processPayment,
    cancelBooking
  };
};