<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MotorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'pelanggan_id' => $this->pelanggan_id,
            'merk' => $this->merk,
            'tipe' => $this->tipe,
            'tahun' => $this->tahun,
            'warna' => $this->warna,
            'plat_nomor' => $this->plat_nomor,
            'nomor_rangka' => $this->nomor_rangka,
            'nomor_mesin' => $this->nomor_mesin,
            'spesifikasi_mesin' => $this->spesifikasi_mesin,
            'pelanggan' => new PelangganResource($this->whenLoaded('pelanggan')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}