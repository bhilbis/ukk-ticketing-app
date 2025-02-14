<?php

namespace App\Http\Controllers\transport;

use App\Http\Controllers\Controller;
use App\Models\TransportSchedule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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

        if (TransportSchedule::where([
            'departure_date' => $validated['departure_date'],
            'departure_time' => $validated['departure_time']
        ])->exists()) {
            return response()->json(['message' => 'Jadwal sudah ada!'], 422);
        }

        $schedule = TransportSchedule::create([
            'departure_date' => $validated['departure_date'],
            'departure_time' => $validated['departure_time']
        ]);

        $schedule->routes()->syncWithoutDetaching(array_unique($validated['route_ids']));

        return response()->json([
            'message' => 'Schedule berhasil dibuat dan dikaitkan ke routes',
            'data' => $schedule->load('routes')
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $schedule = TransportSchedule::with('routes')->findOrFail($id);

        return response()->json([
            'message' => 'Data jadwal transport berhasil ditemukan',
            'data' => $schedule
        ], 200);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'departure_date' => 'required|date',
            'departure_time' => 'required|date_format:H:i',
            'route_ids' => 'required|array',
            'route_ids.*' => 'exists:routes,id'
        ]);

        $schedule = TransportSchedule::findOrFail($id);
        
        $schedule->update([
            'departure_date' => $validated['departure_date'],
            'departure_time' => $validated['departure_time']
        ]);

        $schedule->routes()->sync(array_unique($validated['route_ids']));

        return response()->json([
            'message' => 'Jadwal berhasil diupdate',
            'data' => $schedule->load('routes')
        ], 201);
    }

    public function delete($id): JsonResponse
    {
        $schedule = TransportSchedule::findOrFail($id);
        $schedule->delete();

        return response()->json([
            'message' => 'Jadwal berhasil dihapus'
        ], 201);
    }
}
