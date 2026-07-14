<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservasi extends Model
{
    protected $table = 'reservasi';

    protected $fillable = [
        'pelanggan_id', 'motor_id', 'layanan_id', 'tanggal', 'jam',
        'keluhan', 'nomor_antrian', 'status'
    ];

    public function pelanggan()
    {
        return $this->belongsTo(Pelanggan::class);
    }

    public function motor()
    {
        return $this->belongsTo(Motor::class);
    }

    public function layanan()
    {
        return $this->belongsTo(Layanan::class);
    }

    public function servis()
    {
        return $this->hasOne(Servis::class);
    }
}