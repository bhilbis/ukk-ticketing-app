<?php

namespace App\Http\Controllers\transport;

use App\Http\Controllers\Controller;
use App\Models\TransportClass;
use Illuminate\Http\Request;

class TransportClassController extends Controller
{
    public function index() {
        return response()->json([
            'message' => 'Data kelas transportasi berhasil ditemukan',
            'data' => TransportClass::with('transport')->get()
        ], 200);
    }
    
}
