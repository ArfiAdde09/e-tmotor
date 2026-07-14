<?php

namespace App\Services;

use App\Models\Motor;
use App\Repositories\MotorRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class MotorService
{
    protected MotorRepository $repo;

    public function __construct(MotorRepository $repo)
    {
        $this->repo = $repo;
    }

    public function getAllForCurrentUser(): LengthAwarePaginator
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            return $this->repo->getAllPaginated();
        }

        // Pelanggan
        $pelanggan = $user->pelanggan;
        if (!$pelanggan) {
            abort(403, 'Profil pelanggan tidak ditemukan.');
        }

        return $this->repo->getByPelanggan($pelanggan->id);
    }

    public function getById(int $id): Motor
    {
        $motor = $this->repo->findById($id);
        $user = Auth::user();

        if ($user->role === 'pelanggan') {
            if (!$user->pelanggan || $motor->pelanggan_id !== $user->pelanggan->id) {
                abort(403, 'Motor tidak ditemukan.');
            }
        }

        return $motor;
    }

    public function create(array $data): Motor
    {
        $user = Auth::user();

        if ($user->role === 'pelanggan') {
            if (!$user->pelanggan) {
                abort(403, 'Profil pelanggan tidak ditemukan.');
            }
            $data['pelanggan_id'] = $user->pelanggan->id;
        }

        return $this->repo->create($data);
    }

    public function update(int $id, array $data): Motor
    {
        $motor = $this->getById($id); // already checks ownership
        return $this->repo->update($motor, $data);
    }

    public function delete(int $id): void
    {
        $motor = $this->getById($id);
        $this->repo->delete($motor);
    }
}