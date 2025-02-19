<?php

namespace App\Http\Controllers;

use App\Models\Routes;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RouteController extends Controller
{

    public function index(): JsonResponse
    {
        $routes = Routes::with(['transport', 'transport.classes', 'schedules'])->get();

        return response()->json([
            'message' => 'Data route berhasil ditemukan',
            'data' => $routes
        ], 200);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'destination' => 'required|string|max:100',
            'start_route' => 'required|string|max:100',
            'end_route' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'travel_duration' => 'required|date_format:H:i',
            'transport_id' => 'required|exists:transports,id',
        ]);

        $route = Routes::create($validated);

        return response()->json([
            'message' => 'Route berhasil ditambahkan',
            'data' => $route->load('transport')->load('transport.classes')
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $route = Routes::with(['transport', 'transport.classes', 'schedules'])->findOrFail($id);

        return response()->json([
            'message' => 'Data route berhasil ditemukan',
            'data' => $route
        ], 200);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'destination' => 'sometimes|string|max:100',
            'start_route' => 'sometimes|string|max:100',
            'end_route' => 'sometimes|string|max:100',
            'price' => 'sometimes|numeric|min:0',
            'travel_duration' => 'sometimes|date_format:H:i',
            'transport_id' => 'sometimes|exists:transports,id' . $id,
        ]);

        $route = Routes::findOrFail($id);
        $route->update($validated);

        return response()->json([
            'message' => 'Data route berhasil diupdate',
            'data' => $route->load('transport')->load('transport.classes')
        ], 200);
    }

    public function destroy($id): JsonResponse
    {
        $route = Routes::findOrFail($id);
        $route->delete();

        return response()->json([
            'message' => 'Data route berhasil dihapus',
        ], 200);
    }

}
