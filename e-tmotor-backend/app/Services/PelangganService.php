<?php
namespace App\Services;

use App\Models\Pelanggan;
use App\Repositories\PelangganRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class PelangganService
{
    protected PelangganRepository $repo;

    public function __construct(PelangganRepository $repo)
    {
        $this->repo = $repo;
    }

    public function getAll(): LengthAwarePaginator
    {
        $user = Auth::user();

        if ($user->role !== 'admin') {
            throw new AccessDeniedHttpException('Hanya admin yang dapat mengakses semua data pelanggan.');
        }

        return $this->repo->getAllPaginated();
    }

    public function getById(int $id): Pelanggan
    {
        $pelanggan = $this->repo->findById($id);
        $user = Auth::user();

        if ($user->role === 'pelanggan') {
            if (!$user->pelanggan || $pelanggan->id !== $user->pelanggan->id) {
                throw new AccessDeniedHttpException('Anda tidak memiliki izin untuk mengakses data pelanggan ini.');
            }
        }

        return $pelanggan;
    }

    public function create(array $data): Pelanggan
    {
        $user = Auth::user();
        if ($user->role !== 'admin') {
            throw new AccessDeniedHttpException('Hanya admin yang bisa membuat data pelanggan baru.');
        }
        return $this->repo->create($data);
    }

    public function update(int $id, array $data): Pelanggan
    {
        // getById already performs the authorization check
        $pelanggan = $this->getById($id);
        return $this->repo->update($pelanggan, $data);
    }

    public function delete(int $id): void
    {
        $user = Auth::user();
        if ($user->role !== 'admin') {
            throw new AccessDeniedHttpException('Hanya admin yang bisa menghapus data pelanggan.');
        }

        $pelanggan = $this->repo->findById($id);
        $this->repo->delete($pelanggan);
    }
}