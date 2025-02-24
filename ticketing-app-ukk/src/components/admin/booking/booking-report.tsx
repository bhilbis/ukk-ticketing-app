import { useState } from 'react';
import { useGenerateReport, useDownloadReport, ReportParams } from '@/services/methods/use-report';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { SelectTrigger } from '@/components/ui/select';

const ReportPage = () => {
    const [formParams, setFormParams] = useState({
        start_date: '',
        end_date: '',
        status: ''
    });

    // State untuk menyimpan parameter report yang akan digunakan
    const [reportParams, setReportParams] = useState<ReportParams | undefined>(undefined);

    // Hook untuk generate report
    const { data: reportData, isLoading: isGenerating } = useGenerateReport(reportParams);

    // Hook untuk download langsung (diubah ke mutation)
    const { mutate: downloadReport, isPending: isDownloading } = useDownloadReport();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setFormParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenerateReport = (e: React.FormEvent) => {
        e.preventDefault();
        // Validasi form
        if (!formParams.start_date || !formParams.end_date) {
            alert('Please fill start date and end date');
            return;
        }
        
        // Set parameter report
        setReportParams({
            start_date: formParams.start_date,
            end_date: formParams.end_date,
            status: formParams.status
        });
    };

    const handleDownload = () => {
        if (!reportParams) return;
        downloadReport(reportParams);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Booking Reports</h1>
            
            {/* Form untuk input parameter */}
            <form onSubmit={handleGenerateReport} className="mb-8 space-y-4">
                <div>
                    <Label className="block mb-2">Start Date:</Label>
                    <input
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
                    <input
                        type="date"
                        name="end_date"
                        value={formParams.end_date}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <Label className="block mb-2">Status:</Label>
                    <Select
                        name="status"
                        value={formParams.status}
                        onValueChange={(value) => handleInputChange({ target: { name: 'status', value } })}
                        // className="w-full p-2 border rounded"
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

            {/* Hasil Generate Report */}
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

            {/* Download Langsung */}
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