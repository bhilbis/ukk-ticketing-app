import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { Routes } from "./route";

interface PassengerBookingsResponse {
    passenger: 
    {
        name_passenger: string;
        email: string;
        username: string;
        address: string;
        telp: string;
        birth: string;
        gender: string;
        booking: Bookings[];
    };
}

export interface Bookings {
    id?: number;
    booking_code?: number;
    passenger_id?: number;
    booking_date?: string;
    booking_place?: string;
    seat_code: string;
    route_id: number;
    destination?: string;
    departure_date: string;
    departure_time: string;
    check_in_time?: string;
    booking_status?: "pending" | "confirmed" | "completed" | "cancelled";
    payment_status?: "unpaid" | "paid" | "partial";
    total_payment: string;
    staff_id?: number;
    completed_at?: string;
    passenger? :{
        name_passenger: string;
    }
    route?: Routes;
    payment?:{
        id: number;
        amount: string;
        payment_method: string;
        transaction_id: string;
    }
}

const createBookingQuery = (endpoint: string, queryKey: string[]) => ({
    queryKey,
    queryFn: async () => {
        const { data } = await axiosInstance.get(`/bookings/${endpoint}`);
        return data.data ?? [];
    },
});
// Admin
export const useAllBookings = () => 
    useQuery<Bookings[]>(
        createBookingQuery('', 
            [
                'bookings', 
                'all'
            ]
        )
    );
// User
export const useUserBookings = () => {
    return useQuery<PassengerBookingsResponse['passenger']>({
      queryKey: ['bookings', 'user'],
      queryFn: async () => {
        const { data } = await axiosInstance.get<PassengerBookingsResponse>('/bookings/my');
        return data.passenger;
      },
      staleTime: 60_000,
    });
  };

export const useOccupiedSeats = (routeId: number, departureDate: string) => {
  return useQuery<string[]>({
    queryKey: ["bookings", "occupied-seats", routeId, departureDate],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/bookings");
      const occupiedSeats = data.data
        .filter(
          (booking: Bookings) =>
            booking.route_id === routeId &&
            booking.departure_date === departureDate &&
            booking.booking_status !== "cancelled"
        )
        .map((booking: Bookings) => booking.seat_code);
      return occupiedSeats;
    },
    enabled: !!routeId && !!departureDate,
  });
};
// Mutations

export const useBookingMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation<Bookings, unknown, Bookings>({
        mutationFn: (booking: Bookings) => 
            booking.id 
                ? axiosInstance.put(`/bookings/${booking.id}`, booking)
                    .then((res) => res.data)
                : axiosInstance.post("/bookings", booking)
                    .then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        }
    });
}

export const useValidateBooking = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: number) => axiosInstance.put(`/bookings/validate/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        }
    });
}

export const useDeleteBooking = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: number) => axiosInstance.delete(`/bookings/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        }
    });
}