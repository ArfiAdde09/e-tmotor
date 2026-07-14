<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Motor extends Model
{
    use HasFactory;

    protected $fillable = [
        'pelanggan_id',
        'merk',
        'model',
        'tahun',
        'plat_nomor',
        'warna',
        'status',
    ];

    protected $casts = [
        'tahun' => 'integer',
    ];

    /**
     * Get the pelanggan that owns the motor.
     */
    public function pelanggan()
    {
        return $this->belongsTo(Pelanggan::class);
    }

    /**
     * Get the reservasis for the motor.
     */
    public function reservasis()
    {
        return $this->hasMany(Reservasi::class);
    }
}