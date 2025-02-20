import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { Routes } from "./route";

interface Bookings {
    id: number;
    booking_code: number;
    passenger_id: number;
    booking_date: string;
    booking_place: string;
    seat_code: string;
    route_id: number;
    destination: string;
    departure_date: string;
    check_in_time: string;
    departure_time: string;
    booking_status: "pending" | "confirmed" | "completed" | "cancelled";
    payment_status: "unpaid" | "paid" | "partial";
    total_payment: string;
    staff_id: number;
    passenger? :{
        name_passenger: string;
    }
    route?: Routes;
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
export const useUserBookings = () => 
    useQuery<Bookings[]>(
        createBookingQuery('my',
            ['bookings', 
                'user'
            ]
        )
    );

// Mutations

export const useBookingMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (booking: Bookings) => 
            booking.id 
                ? axiosInstance.put(`/bookings/${booking.id}`, booking)
                : axiosInstance.post("/bookings", booking),
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