<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Carbon\Carbon;

class BookingReportController extends Controller
{
    public function generateReport(Request $request)
    {
        try {
            // Validate request
            $request->validate([
                'start_date' => 'nullable|date',
                'end_date' => 'nullable|date|after_or_equal:start_date',
                'status' => 'nullable|string'
            ]);

            // Query data with relationships
            $query = Booking::with([
                'passenger',
                'route.transport',
                'payment',
                'staff'
            ]);

            // Apply filters
            if ($request->start_date) {
                $query->whereDate('booking_date', '>=', $request->start_date);
            }
            if ($request->end_date) {
                $query->whereDate('booking_date', '<=', $request->end_date);
            }
            if ($request->status) {
                $query->where('booking_status', $request->status);
            }

            $bookings = $query->get();

            // Create new Spreadsheet
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();

            // Set judul sheet
            $sheet->setTitle('Booking Report');

            // Set headers
            $headers = [
                'Booking Code',
                'Booking Date',
                'Passenger Name',
                'Transport',
                'Route',
                'Departure Date',
                'Departure Time',
                'Seat Code',
                'Total Payment',
                'Payment Status',
                'Payment Method',
                'Transaction ID',
                'Staff Name',
                'Booking Status'
            ];

            // Apply header style
            $headerStyle = [
                'font' => [
                    'bold' => true,
                    'color' => ['rgb' => '000000'],
                ],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => ['rgb' => 'E2E8F0']
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    ],
                ],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                    'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                ],
            ];

            // Write headers
            foreach ($headers as $index => $header) {
                $column = chr(65 + $index); // Convert number to letter (0 = A, 1 = B, etc)
                $sheet->setCellValue($column . '1', $header);
                $sheet->getColumnDimension($column)->setAutoSize(true);
            }
            $sheet->getStyle('A1:N1')->applyFromArray($headerStyle);

            // Write data
            $row = 2;
            foreach ($bookings as $booking) {
                $data = [
                    $booking->booking_code,
                    Carbon::parse($booking->booking_date)->format('Y-m-d'),
                    $booking->passenger->name_passenger ?? 'N/A',
                    $booking->route->transport->name_transport ?? 'N/A',
                    $booking->route->destination ?? 'N/A',
                    Carbon::parse($booking->departure_date)->format('Y-m-d'),
                    $booking->departure_time,
                    $booking->seat_code,
                    number_format($booking->total_payment, 2),
                    $booking->payment->payment_status ?? 'N/A',
                    $booking->payment->payment_method ?? 'N/A',
                    $booking->payment->transaction_id ?? 'N/A',
                    $booking->staff->name ?? 'N/A',
                    $booking->booking_status
                ];

                foreach ($data as $index => $value) {
                    $column = chr(65 + $index);
                    $sheet->setCellValue($column . $row, $value);
                }

                // Apply data style
                $dataStyle = [
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                        ],
                    ],
                    'alignment' => [
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                ];
                $sheet->getStyle('A' . $row . ':N' . $row)->applyFromArray($dataStyle);

                $row++;
            }

            // Create file
            $fileName = 'booking_report_' . Carbon::now()->format('Y-m-d_His') . '.xlsx';
            $writer = new Xlsx($spreadsheet);

            // Save to storage
            $path = storage_path('app/public/reports/' . $fileName);

            // Pastikan direktori ada
            if (!file_exists(storage_path('app/public/reports'))) {
                mkdir(storage_path('app/public/reports'), 0777, true);
            }

            $writer->save($path);

            return response()->json([
                'success' => true,
                'message' => 'Report generated successfully',
                'data' => [
                    'file_name' => $fileName,
                    'download_url' => url('storage/reports/' . $fileName)
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate report',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function downloadReport(Request $request)
    {
        try {
            // Generate report first
            $result = $this->generateReport($request);

            if (!$result->original['success']) {
                throw new \Exception($result->original['message']);
            }

            // Get file path
            $filePath = storage_path('app/public/reports/' . $result->original['data']['file_name']);

            // Return file download
            return response()->download($filePath)->deleteFileAfterSend(true);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to download report',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
