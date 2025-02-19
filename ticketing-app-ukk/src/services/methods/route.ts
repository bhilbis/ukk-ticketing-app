import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { Transport } from "./transport";

export interface Routes {
    id: number;
    destination: string;
    start_route: string;
    end_route: string;
    price: number;
    travel_duration: string;
    transport_id: number;
    transport?: Transport[];
}

export const useRoutes = () => {
    return useQuery<Routes[]>({
        queryKey: ["routes"],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/routes`);
            return data.data ?? [];
        },
    })
}

export const useGetRoute = (id: number) => {
    return useQuery<Routes>({
        queryKey: ["routes", id],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/routes/${id}`);
            return data.data ?? [];
        }
    });
}

export const useSaveRoute = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (route: Routes) => {
            if (route.id) {
                return axiosInstance.put(`/routes/${route.id}`, route);
            } else {
                return axiosInstance.post("/routes", route);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["routes"] });
        },
        onError: () => {

        },
    });
};

export const useDeleteRoute = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            return axiosInstance.delete(`/routes/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["routes"] });
        },
        onError: () => {

        },
    });
};