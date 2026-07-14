<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servis extends Model
{
    protected $table = 'servis';

    protected $fillable = [
        'reservasi_id', 'mekanik', 'tanggal_mulai', 'tanggal_selesai',
        'catatan_mekanik', 'diagnosa', 'total_biaya', 'status'
    ];

    public function reservasi()
    {
        return $this->belongsTo(Reservasi::class);
    }

    public function detailServis()
    {
        return $this->hasMany(DetailServis::class);
    }

    public function transaksi()
    {
        return $this->hasOne(Transaksi::class);
    }
}