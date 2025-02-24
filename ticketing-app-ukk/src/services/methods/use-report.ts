import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

// Types
export interface BookingReport {
    file_name: string;
    download_url: string;
}

export interface ReportParams {
    start_date?: string;
    end_date?: string;
    status?: string;
}

export interface ReportResponse {
    success: boolean;
    message: string;
    data: BookingReport;
}

// Hook untuk generate report dan mendapatkan URL download
export const useGenerateReport = (params?: ReportParams) => {
    return useQuery<ReportResponse>({
        queryKey: ["booking-report", params],
        queryFn: async () => {
            const searchParams = new URLSearchParams();
            
            if (params?.start_date) {
                searchParams.append("start_date", params.start_date);
            }
            if (params?.end_date) {
                searchParams.append("end_date", params.end_date);
            }
            if (params?.status) {
                searchParams.append("status", params.status);
            }

            const { data } = await axiosInstance.get(
                `/reports/bookings?${searchParams.toString()}`
            );
            return data;
        },
        enabled: !!params, // Query hanya dijalankan jika ada params
    });
};

// Hook untuk langsung download report
export const useDownloadReport = () => {
    return useMutation<Blob, Error, ReportParams>({
        mutationFn: async (params) => {
            const searchParams = new URLSearchParams();
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined) {
                        searchParams.append(key, value);
                    }
                });
            }
            const response = await axiosInstance.get(
                `/reports/bookings/download?${searchParams.toString()}`,
                { responseType: 'blob' }
            );
            return response.data;
        },
        onSuccess: (data: Blob) => {
            const url = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `booking_report_${new Date().getTime()}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        }
    });
};