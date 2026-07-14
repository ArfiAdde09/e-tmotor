<?php
namespace App\Repositories;

use App\Models\Pelanggan;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PelangganRepository
{
    public function getAllPaginated(int $perPage = 10): LengthAwarePaginator
    {
        return Pelanggan::with('user')->paginate($perPage);
    }

    public function findById(int $id): Pelanggan
    {
        return Pelanggan::with('user', 'motors', 'reservasis')->findOrFail($id);
    }

    public function create(array $data): Pelanggan
    {
        return Pelanggan::create($data);
    }

    public function update(Pelanggan $pelanggan, array $data): Pelanggan
    {
        $pelanggan->update($data);
        return $pelanggan;
    }

    public function delete(Pelanggan $pelanggan): void
    {
        $pelanggan->delete();
    }
}