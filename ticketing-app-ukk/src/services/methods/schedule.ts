import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { Routes } from "./route";

export interface Schedule {
    id: number;
    departure_date: string;
    departure_time: string;
    route_ids: number[];
    routes?: Routes[];
}

export const useSchedules = () => {
    return useQuery<Schedule[]>({
        queryKey: ["schedules"],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/schedules`);
            return data.data ?? [];
        },
    })
}

export const useGetSchedule = (id: number) => {
    return useQuery<Schedule>({
        queryKey: ["schedules", id],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/schedules/${id}`);
            return {
                ...data.data,
                route_ids: data.data?.routes?.map((route: Routes) => route.id.toString()) || []
            };
        },
        enabled: !!id,
    });
}

export const useSaveSchedule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (schedule: Schedule) => {
            const payload = {
                departure_date: schedule.departure_date,
                departure_time: schedule.departure_time,
                route_ids: schedule.route_ids
            };

            if (schedule.id) {
                return axiosInstance.put(`/schedules/${schedule.id}`, payload);
            } else {
                return axiosInstance.post("/schedules", payload);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedules"] });
        },
        onError: () => {

        },
    });
}

export const useDeleteSchedule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            return axiosInstance.delete(`/schedules/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedules"] });
        },
        onError: () => {
            
        }
    });
}