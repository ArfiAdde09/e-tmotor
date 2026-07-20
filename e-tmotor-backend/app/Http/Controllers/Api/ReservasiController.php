<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReservasiRequest;
use App\Http\Requests\UpdateReservasiRequest;
use App\Http\Resources\ReservasiResource;
use App\Services\ReservasiService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ReservasiController extends Controller
{
    public function __construct(protected ReservasiService $service)
    {
        // Apply middleware for role-based access control if needed in the future
        // For now, service-layer authorization is sufficient.
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        $reservasis = $this->service->getAllForCurrentUser();
        return ReservasiResource::collection($reservasis);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReservasiRequest $request): JsonResponse
    {
        $reservasi = $this->service->create($request->validated());
        return (new ReservasiResource($reservasi))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id): ReservasiResource
    {
        $reservasi = $this->service->getById($id);
        return new ReservasiResource($reservasi);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id): ReservasiResource
    {
        // Note: Using a dedicated UpdateReservasiRequest is recommended
        $reservasi = $this->service->update($id, $request->all());
        return new ReservasiResource($reservasi);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return response()->json(null, 204);
    }
}
