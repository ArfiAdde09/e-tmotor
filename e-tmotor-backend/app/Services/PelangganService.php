<?php
namespace App\Services;

use App\Repositories\PelangganRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PelangganService
{
    protected PelangganRepository $repo;

    public function __construct(PelangganRepository $repo)
    {
        $this->repo = $repo;
    }

    public function getAll(): LengthAwarePaginator
    {
        return $this->repo->getAllPaginated();
    }

    public function getById(int $id): Pelanggan
    {
        return $this->repo->findById($id);
    }

    public function create(array $data): Pelanggan
    {
        return $this->repo->create($data);
    }

    public function update(int $id, array $data): Pelanggan
    {
        $pelanggan = $this->repo->findById($id);
        return $this->repo->update($pelanggan, $data);
    }

    public function delete(int $id): void
    {
        $pelanggan = $this->repo->findById($id);
        $this->repo->delete($pelanggan);
    }
}