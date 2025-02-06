<?php

namespace App\Http\Controllers;

use App\Models\Levels;
use Illuminate\Http\Request;

class LevelController extends Controller
{
    public function index () {

        return response()->json([
            'message' => 'Data level berhasil ditemukan',
            'data' => Levels::all()
        ], 201);
    }

    // public function updateById($id, Request $request) {

    //     $validated = $request->validate([
    //         'level_name' => 'required|string|max:255',
    //     ]);

    //     $level = Levels::findOrFail($id);
    //     $level->update($validated);

    //     return response()->json([
    //         'message' => 'Data level berhasil diupdate',
    //         'data' => $level
    //     ], 201);
    // }
}
