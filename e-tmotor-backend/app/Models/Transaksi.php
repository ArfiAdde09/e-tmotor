<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    protected $table = 'transaksi';
    protected $fillable = [
        'servis_id', 'metode_pembayaran', 'status_pembayaran', 'tanggal_bayar', 'total'
    ];

    public function servis()
    {
        return $this->belongsTo(Servis::class);
    }
}