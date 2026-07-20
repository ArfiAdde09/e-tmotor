<?php

namespace App\Repositories;

use App\Models\Reservasi;
use Illuminate\Pagination\LengthAwarePaginator;

class ReservasiRepository
{
    public function getAllPaginated(int $perPage = 10): LengthAwarePaginator
    {
        return Reservasi::with('pelanggan.user', 'motor', 'layanan')
            ->orderBy('tanggal', 'desc')
            ->orderBy('jam', 'desc')
            ->paginate($perPage);
    }

    public function getByPelanggan(int $pelangganId, int $perPage = 10): LengthAwarePaginator
    {
        return Reservasi::where('pelanggan_id', $pelangganId)
            ->with('pelanggan.user', 'motor', 'layanan')
            ->orderBy('tanggal', 'desc')
            ->orderBy('jam', 'desc')
            ->paginate($perPage);
    }

    public function findById(int $id): Reservasi
    {
        return Reservasi::with('pelanggan.user', 'motor', 'layanan')
            ->findOrFail($id);
    }

    public function getCountByDate(string $date): int
    {
        return Reservasi::where('tanggal', $date)->count();
    }

    public function create(array $data): Reservasi
    {
        return Reservasi::create($data);
    }

    public function update(Reservasi $reservasi, array $data): Reservasi
    {
        $reservasi->update($data);
        return $reservasi;
    }

    public function delete(Reservasi $reservasi): void
    {
        $reservasi->delete();
    }
}
