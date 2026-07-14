<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PelangganResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nik' => $this->nik,
            'tanggal_lahir' => $this->tanggal_lahir,
            'jenis_kelamin' => $this->jenis_kelamin,
            'user' => new UserResource($this->whenLoaded('user')),
            'motors_count' => $this->whenCounted('motors'),
            'reservasi_count' => $this->whenCounted('reservasis'),
        ];
    }
}