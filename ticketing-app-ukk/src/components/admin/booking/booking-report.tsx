import { useEffect, useRef, useState } from 'react';
import { useGenerateReport, useDownloadReport, ReportParams } from '@/services/methods/use-report';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { SelectTrigger } from '@/components/ui/select';
import { Toaster ,toast } from 'sonner';
import { Input } from '@/components/ui/input';

const ReportPage = () => {
    const [formParams, setFormParams] = useState({
        start_date: '',
        end_date: '',
        status: ''
    });
    const [error, setError] = useState('');
    const [reportParams, setReportParams] = useState<ReportParams | undefined>(undefined);
    const { data: reportData, isLoading: isGenerating, error: generateError } = useGenerateReport(reportParams);
    const { mutate: downloadReport, isPending: isDownloading } = useDownloadReport();
    const toastId = useRef<string | number | null>(null);

    useEffect(() => {
        if (isGenerating) {
            toastId.current = toast.loading('Generating report...');
        } else {
            if (toastId.current !== null) {
                toast.dismiss(toastId.current);
                toastId.current = null;
            }
            if (generateError) {
                toast.error('Failed to generate report');
            } else if (reportData) {
                toast.success('Report generated successfully');
            }
        }
    }, [isGenerating, generateError, reportData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setFormParams(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleGenerateReport = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formParams.start_date || !formParams.end_date) {
            toast.error('Please fill start date and end date');
            return;
        }

        if (new Date(formParams.end_date) < new Date(formParams.start_date)) {
            setError('End date cannot be earlier than start date');
            return;
        }
        
        setReportParams({
            start_date: formParams.start_date,
            end_date: formParams.end_date,
            status: formParams.status
        });
    };

    const handleDownload = () => {
        if (!reportParams) {
            toast.error('No report parameters set');
            return;
        }
        downloadReport(reportParams, {
            onSuccess: () => toast.success('Report downloaded successfully'),
            onError: () => toast.error('Failed to download report')
        });
    };

    return (
        <div className="p-4">
            <Toaster position="top-right" richColors />
            <h1 className="text-2xl font-bold mb-6">Booking Reports</h1>
            <form onSubmit={handleGenerateReport} className="mb-8 space-y-4">
                <div>
                    <Label className="block mb-2">Start Date:</Label>
                    <Input
                        type="date"
                        name="start_date"
                        value={formParams.start_date}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <Label className="block mb-2">End Date:</Label>
                    <Input
                        type="date"
                        name="end_date"
                        value={formParams.end_date}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>

                <div>
                    <Label className="block mb-2">Status:</Label>
                    <Select
                        name="status"
                        value={formParams.status}
                        onValueChange={(value) => handleInputChange({ target: { name: 'status', value } })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="canceled">Canceled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <button
                    type="submit"
                    disabled={isGenerating}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {isGenerating ? 'Generating Report...' : 'Generate Report'}
                </button>
            </form>

            {reportData?.data && (
                <div className="mb-8 p-4 bg-gray-50 rounded">
                    <h2 className="text-xl font-semibold mb-2">Generated Report</h2>
                    <p className="mb-2">File Name: {reportData.data.file_name}</p>
                    <a
                        href={reportData.data.download_url}
                        className="text-blue-500 hover:underline"
                        download
                    >
                        Download Generated Report
                    </a>
                </div>
            )}

            <div className="border-t pt-4">
                <h2 className="text-xl font-semibold mb-2">Direct Download</h2>
                <button
                    onClick={handleDownload}
                    disabled={isDownloading || !reportParams}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
                >
                    {isDownloading ? 'Downloading...' : 'Download Current Report'}
                </button>
            </div>
        </div>
    );
};

export default ReportPage;