<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Layanan extends Model
{
    protected $table = 'layanan';
    protected $fillable = ['nama', 'estimasi_waktu', 'harga', 'deskripsi'];

    public function reservasis()
    {
        return $this->hasMany(Reservasi::class);
    }
}