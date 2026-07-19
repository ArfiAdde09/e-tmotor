<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReservasiRequest;
use App\Http\Resources\ReservasiResource;
use App\Services\ReservasiService;
use App\Models\Reservasi;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ReservasiController extends Controller
{
    public function __construct(protected ReservasiService $service)
    {
    }

    /**
     * Display a listing of the reservations for the authenticated user.
     */
    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();
        if (!$user->isCustomer() || !$user->pelanggan) {
            return response()->json(['data' => []]);
        }

        $reservasis = Reservasi::where('pelanggan_id', $user->pelanggan->id)
            ->with(['motor', 'layanan'])
            ->latest()
            ->paginate($request->query('per_page', 10));

        return ReservasiResource::collection($reservasis)->response();
    }


    /**
     * Store a newly created reservation in storage.
     */
    public function store(StoreReservasiRequest $request): JsonResponse
    {
        $reservasi = $this->service->create($request->validated());
        $reservasi->load(['motor', 'layanan', 'pelanggan']);

        return (new ReservasiResource($reservasi))
            ->response()
            ->setStatusCode(201);
    }
}
