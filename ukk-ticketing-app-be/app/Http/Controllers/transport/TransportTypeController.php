<?php

namespace App\Http\Controllers\transport;

use App\Http\Controllers\Controller;
use App\Models\TransportTypes;
use Illuminate\Http\Request;

class TransportTypeController extends Controller
{
    // TransportTypeController.php
    public function index()
    {
        $transportTypes = TransportTypes::all();
        return response()->json([
            'message' => 'Data tipe transportasi berhasil ditemukan',
            'data' => $transportTypes
        ], 200);
    }

    public function show($id)
    {
        $transportType = TransportTypes::findOrFail($id);
        return response()->json([
            'message' => 'Tipe data id transportasi berhasil ditemukan',
            'data' => $transportType
        ], 200);
    }

    // kedepan mungkin ditambahkan transportasi lain
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'required|string',
        ]);

        $transportType = TransportTypes::create($validated);

        return response()->json([
            'message' => 'Tipe Transportasi berhasil ditambahkan',
            'data' => $transportType
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:100',
            'description' => 'sometimes|string',
        ]);

        $transportType = TransportTypes::findOrFail($id);
        $transportType->update($validated);

        return response()->json([
            'message' => 'Data tipe transportasi berhasil diubah',
            'data' => $transportType
        ], 200);
    }

    public function destroy($id)
    {
        $transportType = TransportTypes::findOrFail($id);
        $transportType->delete();

        return response()->json([
            'message' => 'Data tipe transportasi berhasil dihapus',
        ], 200);
    }

}
