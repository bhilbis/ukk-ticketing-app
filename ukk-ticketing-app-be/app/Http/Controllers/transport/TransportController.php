<?php

namespace App\Http\Controllers\transport;

use App\Http\Controllers\Controller;
use App\Models\TransportClass;
use App\Models\Transports;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TransportController extends Controller
{
     // Ambil semua transportasi
    public function index(): JsonResponse
    {
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
                'data' => $transports->load('classes')
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

     // untuk generate code berdasarkan type
    private function generateTransportCode($typeId, $name_transport)
    {
         // Definisi prefix berdasarkan type
        if ($typeId == 2 && strtoupper($name_transport) == 'WHOOSH') {
            $prefix = 'WHOOSH-';
            $digitLength = 3;
        } else {$prefixMap = [
            1 => 'PS-',
            2 => 'KA-'
        ];
        $prefix = $prefixMap[$typeId] ?? 'XX-';
            $digitLength = 4;
        }

        $prefix = $prefixMap[$typeId] ?? 'XX-';

         // mengambil data terbaru
        $latestTransport = Transports::where('code', 'LIKE', $prefix . '%')
            ->orderBy('code', 'desc')
            ->first();

        if (!$latestTransport) {
            return $prefix . str_pad(1, $digitLength, '0', STR_PAD_LEFT);
        }

         // Ekstrak nomor dari kode terbaru
        $currentNumber = intval(substr($latestTransport->code, strlen($prefix)));
        $nextNumber = $currentNumber + 1;

         // Format kode baru dengan angka nol di depan
        return $prefix . str_pad($nextNumber, $digitLength, '0', STR_PAD_LEFT);
    }

     // Tambah transportasi baru
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            $request->merge([
                'has_discount' => filter_var($request->has_discount, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE),
            ]);

            $validated = $request->validate([
                'name_transport' => 'required|string|max:100',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'has_discount' => 'nullable|boolean',
                'description' => 'nullable|string',
                'type_id' => 'required|exists:transport_types,id',
                'classes' => 'required|array',
                'classes.*.class_name' => 'required|string|max:50',
                'classes.*.seat_count' => 'required|integer|min:20|max:1000'
            ]);

            if ($request->hasFile('image') && $request->file('image')->isValid()) {
                $image = $request->file('image');
                $filename = time() . '_' . $image->getClientOriginalName();
                $imagePath = $image->storeAs('transport', $filename, 'public');
                $validated['image'] = $imagePath;
            }

            $validated['code'] = $this->generateTransportCode(
                $validated['type_id'],
                $validated['name_transport']
            );

            $transport = Transports::create($validated);

            foreach ($validated['classes'] as $class) {
                TransportClass::create([
                    'transport_id' => $transport->id,
                    'class_name' => $class['class_name'],
                    'seat_count' => $class['seat_count'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Transportasi berhasil ditambahkan',
                'data' => $transport->load('classes')
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            if (isset($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
            return response()->json([
                'message' => 'Gagal menambahkan transportasi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

     // Update transportasi
    public function update(Request $request, $id)
    {
        try {
            $request->merge([
                'has_discount' => filter_var($request->has_discount, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE),
            ]);

            $validated = $request->validate([
                'name_transport' => 'required|string|max:100',
                'type_id' => 'required|exists:transport_types,id',
                'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'has_discount' => 'boolean',
                'description' => 'nullable|string',
                'classes' => 'required|array',
                'classes.*.class_name' => 'required|string|max:50',
                'classes.*.seat_count' => 'required|integer|min:20|max:1000'
            ]);

            $transport = Transports::findOrFail($id);

            if ($request->hasFile('image') && $request->file('image')->isValid()) {
                if ($transport->image) {
                    Storage::disk('public')->delete($transport->image);
                }

                $image = $request->file('image');
                $filename = time() . '_' . $image->getClientOriginalName();
                $imagePath = $image->storeAs('transport', $filename, 'public');
                $validated['image'] = $imagePath;
            } else if ($request->input('image') === '') {
                $validated['image'] = null;
                if ($transport->image) {
                    Storage::disk('public')->delete($transport->image);
                }
            }

            if ($transport->type_id != $validated['type_id'] ||
                $transport->name_transport != $validated['name_transport']) {
                $validated['code'] = $this->generateTransportCode(
                    $validated['type_id'],
                    $validated['name_transport']
                );
            }

            $classNames = collect($validated['classes'])->pluck('class_name')->toArray();

            TransportClass::where('transport_id', $transport->id)
                ->whereNotIn('class_name', $classNames)
                ->delete();

            foreach ($validated['classes'] as $class) {
                $transportClass = TransportClass::where('transport_id', $transport->id)
                    ->where('class_name', $class['class_name'])
                    ->first();

                if ($transportClass) {
                    $transportClass->update([
                        'seat_count' => $class['seat_count'],
                    ]);
                } else {
                    TransportClass::create([
                        'transport_id' => $transport->id,
                        'class_name' => $class['class_name'],
                        'seat_count' => $class['seat_count'],
                    ]);
                }
            }

            $transport->update($validated);

            return response()->json([
                'message' => 'Transportasi berhasil diupdate',
                'data' => $transport->load('classes')
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal Mengupdate transportasi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getById($id)
    {
        $transport = Transports::with(['type', 'classes'])->findOrFail($id);
        return response()->json([
            'message' => 'Data transportasi berhasil ditemukan',
            'data' => $transport
        ], 200);
    }

    public function destroy($id)
    {
        $transport = Transports::findOrFail($id);
        $transport->delete();

        return response()->json(
            ['message' => 'Transportasi berhasil dihapus'
        ], 200);
    }
}
