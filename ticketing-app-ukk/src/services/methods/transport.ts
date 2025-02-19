import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

export interface Transport {
    id: number;
    name_transport: string;
    image: string;
    has_discount: boolean;
    description: string;
    type_id: number;
    classes: {
        class_name: string,
        seat_count: number,
    }[];
}

// Fetch daftar transportasi berdasarkan type_id
export const useTransports = () => {
  return useQuery<Transport[]>({
    queryKey: ["transports"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/transports`);
      return data.data ?? [];
    },
  });
};

export const useGetTransport = (id: number) => {
  return useQuery<Transport>({
    queryKey: ["transports", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/transports/${id}`);
      return data.data ?? [];
    }
  });
}

// Tambah atau update transportasi
export const useSaveTransport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transport: Transport) => {
      if (transport.id) {
        return axiosInstance.put(`/transports/${transport.id}`, transport);
      } else {
        return axiosInstance.post("/transports", transport);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transports"] });
    },
    onError: () => {

    },
  });
};

// Hapus transportasi
export const useDeleteTransport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return axiosInstance.delete(`/transports/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transports"] });
    },
    onError: () => {

    },
  });
};