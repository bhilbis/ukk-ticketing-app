<?php

namespace App\Http\Controllers\transport;

use App\Http\Controllers\Controller;
use App\Models\TransportClass;
use Illuminate\Http\Request;

class TransportClassController extends Controller
{
    public function index() {
        return response()->json(TransportClass::with('transport')->get());
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'transport_id' => 'required|exists:transports,id',
            'class_name' => 'required|string|max:50',
            'seat_count' => 'required|numeric|min:1',
        ]);

        $class = TransportClass::create($validated);
        return response()->json($class, 201);
    }

    public function getById($id) {
        $class = TransportClass::with('transport')->find($id);
        if ($class) {
            return response()->json([
                'message' => 'Data kelas transportasi berhasil di temukan',
                'data' => $class
            ], 201);
        }
        return response()->json(['message' => 'Not Found'], 404);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'class_name' => 'required|string|max:50',
            'seat_count' => 'required|numeric|min:1',
        ]);

        $class = TransportClass::find($id);
        $class->update($validated);

        return response()->json([
            'message' => 'Kelas transportasi berhasil di update',
            'data' => $class
        ], 201);
    }

    public function destroy($id) {
        $class = TransportClass::find($id);
        $class->delete();

        return response()->json(['message' => 'Kelas transportasi berhasil di hapus'], 201);
    }
}
