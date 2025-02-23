/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

export interface Transport {
    id: number;
    code?: string;
    name_transport: string;
    image: File |string;
    has_discount: boolean;
    description: string;
    type_id: number;
    classes: {
        class_name: string,
        seat_count: number,
    }[];
}

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

export const useSaveTransport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transport: Transport) => {
      const formData = new FormData();

      // Append basic fields
      formData.append('_method', transport.id ? 'PUT' : 'POST'); // Untuk handle Laravel PUT
      formData.append('name_transport', transport.name_transport);
      formData.append('has_discount', transport.has_discount.toString());
      formData.append('description', transport.description);
      formData.append('type_id', transport.type_id.toString());

      // Handle image
      if (transport.image) {
        if (transport.image instanceof File) {
          formData.append('image', transport.image);
        } else if (typeof transport.image === 'string') {
          formData.append('image_url', transport.image); // Kirim URL existing
        }
      }

      // Handle classes
      transport.classes.forEach((cls, index) => {
        formData.append(`classes[${index}][class_name]`, cls.class_name);
        formData.append(`classes[${index}][seat_count]`, cls.seat_count.toString());
        // if (cls.id) formData.append(`classes[${index}][id]`, cls.id.toString());
      });

      // Debug isi FormData
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      if (transport.id) {
        return axiosInstance.post(`/transports/${transport.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        return axiosInstance.post("/transports", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
    },
    // ...rest tetap sama
  });
};

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