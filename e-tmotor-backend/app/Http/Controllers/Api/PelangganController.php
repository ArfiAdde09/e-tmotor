<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePelangganRequest;
use App\Http\Requests\UpdatePelangganRequest;
use App\Http\Resources\PelangganResource;
use App\Services\PelangganService;
use Illuminate\Http\JsonResponse;

class PelangganController extends Controller
{
    public function __construct(protected PelangganService $service) {}

    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => PelangganResource::collection($this->service->getAll())
        ]);
    }

    public function store(StorePelangganRequest $request): JsonResponse
    {
        $pelanggan = $this->service->create($request->validated());
        return (new PelangganResource($pelanggan))
            ->response()
            ->setStatusCode(201);
    }

    public function show(int $id): PelangganResource
    {
        return new PelangganResource($this->service->getById($id));
    }

    public function update(UpdatePelangganRequest $request, int $id): PelangganResource
    {
        $pelanggan = $this->service->update($id, $request->validated());
        return new PelangganResource($pelanggan);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return response()->json(['success' => true, 'message' => 'Pelanggan dihapus']);
    }
}