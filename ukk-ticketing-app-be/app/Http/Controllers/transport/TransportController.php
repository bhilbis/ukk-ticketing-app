<?php

namespace App\Http\Controllers\transport;

use App\Http\Controllers\Controller;
use App\Models\TransportClass;
use App\Models\Transports;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TransportController extends Controller
{
     // Ambil semua transportasi
        public function index(): JsonResponse
        {
         // return response()->json(Transports::with(['type', 'classes'])->get());
            try {
                $transports = Transports::all();
                if ($transports->isEmpty()) {
                    return response()->json([
                        'message' => 'Data transportasi tidak ditemukan',
                        'data' => []
                    ], 404);
                }
                return response()->json([
                    'message' => 'Data transportasi berhasil ditemukan',
                    'data' => $transports
                ], 201);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Terjadi kesalahan saat mengambil data',
                    'error' => $e->getMessage()
                ], 500);
            }
        }

     // Tambah transportasi baru
     public function store(Request $request)
     {
         $validated = $request->validate([
             'code' => 'required|string|max:50|unique:transports,code',
             'name_transport' => 'required|string|max:100',
             'has_discount' => 'boolean',
             'description' => 'nullable|string',
             'type_id' => 'required|exists:transport_types,id',
             'classes' => 'required|array', // Tambahkan validasi array kelas
             'classes.*.class_name' => 'required|string|max:50',
             'classes.*.seat_count' => 'required|integer|min:1'
         ]);
 
         $transport = Transports::create($validated);
 
         
             foreach ($request->classes as $class) {
                 TransportClass::create([
                     'transport_id' => $transport->id,
                     'class_name' => $class['class_name'],
                     'seat_count' => $class['seat_count']
                 ]);
             }
 
         return response()->json([
             'message' => 'Transportasi berhasil ditambahkan',
             'data' => $transport->load('classes')
         ], 201);
     }
 
     // Ambil transportasi berdasarkan ID
     public function getById($id)
     {
         $transport = Transports::with(['type', 'classes'])->findOrFail($id);
         return response()->json([
             'message' => 'Data transportasi berhasil ditemukan',
             'data' => $transport
         ], 201);
     }
 
     // Update transportasi
     public function update(Request $request, $id)
     {
         $validated = $request->validate([
             'code' => 'string|max:50|unique:transports,code,' . $id,
             'name_transport' => 'string|max:100',
             'has_discount' => 'boolean',
             'description' => 'nullable|string',
             'type_id' => 'exists:transport_types,id'
         ]);
 
         $transport = Transports::findOrFail($id);
         $transport->update($validated);
 
         return response()->json([
             'message' => 'Transportasi berhasil diupdate',
             'data' => $transport
         ], 201);
     }
 
     // Hapus transportasi
     public function destroy($id)
     {
         $transport = Transports::findOrFail($id);
         $transport->delete();
 
         return response()->json(['message' => 'Transportasi berhasil dihapus'], 201);
     }
}
