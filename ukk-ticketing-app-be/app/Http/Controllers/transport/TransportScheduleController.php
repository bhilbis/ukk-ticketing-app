<?php

namespace App\Http\Controllers\transport;

use App\Http\Controllers\Controller;
use App\Models\TransportSchedule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Route;

class TransportScheduleController extends Controller
{
    public function index(): JsonResponse
    {
        $schedules = TransportSchedule::with('routes')->get();

        return response()->json([
            'message' => 'Data jadwal transport berhasil ditemukan',
            'data' => $schedules
        ], 200);
    }

    public function store(): JsonResponse
    {
        $validated = request()->validate([
            'departure_date' => 'required|date',
            'departure_time' => 'required|date_format:H:i',
            'route_ids' => 'required|array',
            'route_ids.*' => 'exists:routes,id'
        ]);

        $schedule = TransportSchedule::create([
            'departure_date' => $validated['departure_date'],
            'departure_time' => $validated['departure_time']
        ]);

        Route::whereIn('id', $validated['route_ids'])->update(['schedule_id' => $schedule->id]);

        return response()->json([
            'message' => 'Schedule berhasil dibuat dan dikaitkan ke routes',
            'data' => $schedule->load('routes')
        ], 201);
    }

    

}
