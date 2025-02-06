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
        return response()->json($transportTypes);
    }

    public function show($id)
    {
        $transportType = TransportTypes::findOrFail($id);
        return response()->json($transportType);
    }
}
