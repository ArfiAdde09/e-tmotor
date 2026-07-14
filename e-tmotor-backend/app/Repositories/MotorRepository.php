<?php

namespace App\Repositories;

use App\Models\Motor;
use Illuminate\Pagination\LengthAwarePaginator;

class MotorRepository
{
    public function getAllPaginated(int $perPage = 10): LengthAwarePaginator
    {
        return Motor::with('pelanggan.user')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getByPelanggan(int $pelangganId, int $perPage = 10): LengthAwarePaginator
    {
        return Motor::where('pelanggan_id', $pelangganId)
            ->with('pelanggan.user')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function findById(int $id): Motor
    {
        return Motor::with('pelanggan.user', 'reservasis')
            ->findOrFail($id);
    }

    public function create(array $data): Motor
    {
        return Motor::create($data);
    }

    public function update(Motor $motor, array $data): Motor
    {
        $motor->update($data);
        return $motor;
    }

    public function delete(Motor $motor): void
    {
        $motor->delete();
    }
}