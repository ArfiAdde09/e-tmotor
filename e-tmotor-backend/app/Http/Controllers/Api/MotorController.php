<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMotorRequest;
use App\Http\Requests\UpdateMotorRequest;
use App\Http\Resources\MotorResource;
use App\Services\MotorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class MotorController extends Controller
{
    protected MotorService $service;

    public function __construct(MotorService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of motors.
     */
    public function index(): AnonymousResourceCollection
    {
        $motors = $this->service->getAllForCurrentUser();
        return MotorResource::collection($motors);
    }

    /**
     * Store a newly created motor.
     */
    public function store(StoreMotorRequest $request): JsonResponse
    {
        $motor = $this->service->create($request->validated());
        return (new MotorResource($motor))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified motor.
     */
    public function show(int $id): MotorResource
    {
        $motor = $this->service->getById($id);
        return new MotorResource($motor);
    }

    /**
     * Update the specified motor.
     */
    public function update(UpdateMotorRequest $request, int $id): MotorResource
    {
        $motor = $this->service->update($id, $request->validated());
        return new MotorResource($motor);
    }

    /**
     * Remove the specified motor.
     */
    public function destroy(int $id): JsonResponse
    {
        $this->service->delete($id);
        return response()->json([
            'success' => true,
            'message' => 'Data motor berhasil dihapus.',
        ]);
    }
}