<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Layanan;
use Illuminate\Http\JsonResponse;

class LayananController extends Controller
{
    /**
     * Display a listing of all services.
     * This is a public endpoint.
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => Layanan::orderBy('nama')->get()
        ]);
    }
}
