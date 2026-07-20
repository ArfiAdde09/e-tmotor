<?php

namespace App\Services;

use App\Models\Reservasi;
use App\Repositories\ReservasiRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class ReservasiService
{
    protected ReservasiRepository $repo;
    protected MotorService $motorService;

    public function __construct(ReservasiRepository $repo, MotorService $motorService)
    {
        $this->repo = $repo;
        $this->motorService = $motorService;
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
            throw new AccessDeniedHttpException('Profil pelanggan tidak ditemukan.');
        }

        return $this->repo->getByPelanggan($pelanggan->id);
    }

    public function getById(int $id): Reservasi
    {
        $reservasi = $this->repo->findById($id);
        $user = Auth::user();

        if ($user->role === 'pelanggan') {
            if (!$user->pelanggan || $reservasi->pelanggan_id !== $user->pelanggan->id) {
                throw new AccessDeniedHttpException('Reservasi tidak ditemukan.');
            }
        }

        return $reservasi;
    }

    public function create(array $data): Reservasi
    {
        $user = Auth::user();
        $pelanggan = $user->pelanggan;

        if (!$pelanggan) {
            throw new AccessDeniedHttpException('Profil pelanggan tidak ditemukan.');
        }
        
        // Ensure motor belongs to the user
        $this->motorService->getById($data['motor_id']);

        $data['pelanggan_id'] = $pelanggan->id;
        $data['status'] = 'Menunggu';
        
        $date_for_antrian = $data['tanggal'];
        $count_today = $this->repo->getCountByDate($date_for_antrian);
        $data['nomor_antrian'] = 'RSV-' . date('Ymd', strtotime($date_for_antrian)) . '-' . str_pad($count_today + 1, 3, '0', STR_PAD_LEFT);

        return $this->repo->create($data);
    }

    public function update(int $id, array $data): Reservasi
    {
        $reservasi = $this->getById($id); // Authorization check
        $user = Auth::user();

        if ($user->role !== 'admin') {
            // For now, only allow admins to update status.
            // A customer might be able to cancel, but that's a different feature.
            if (isset($data['status'])) {
                 throw new AccessDeniedHttpException('Hanya admin yang dapat mengubah status reservasi.');
            }
            // Prevent customers from changing any other details post-creation
            unset($data['motor_id'], $data['layanan_id'], $data['tanggal'], $data['jam'], $data['keluhan']);
        }
        
        return $this->repo->update($reservasi, $data);
    }

    public function delete(int $id): void
    {
        $user = Auth::user();
        if ($user->role !== 'admin') {
            throw new AccessDeniedHttpException('Hanya admin yang dapat menghapus reservasi.');
        }

        $reservasi = $this->getById($id);
        $this->repo->delete($reservasi);
    }
}
