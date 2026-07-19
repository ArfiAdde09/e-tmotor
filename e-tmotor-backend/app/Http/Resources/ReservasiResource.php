<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservasiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'pelanggan_id' => $this->pelanggan_id,
            'motor_id' => $this->motor_id,
            'layanan_id' => $this->layanan_id,
            'tanggal' => $this->tanggal,
            'jam' => $this->jam,
            'keluhan' => $this->keluhan,
            'nomor_antrian' => $this->nomor_antrian,
            'status' => $this->status,
            'created_at' => $this->created_at->toDateTimeString(),

            // Eager load relationships for better performance
            'motor' => new MotorResource($this->whenLoaded('motor')),
            'layanan' => $this->whenLoaded('layanan'),
            'pelanggan' => new PelangganResource($this->whenLoaded('pelanggan')),
        ];
    }
}
