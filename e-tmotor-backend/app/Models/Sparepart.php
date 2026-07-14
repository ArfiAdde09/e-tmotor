<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sparepart extends Model
{
    protected $table = 'spareparts';

    protected $fillable = [
        'kategori_id', 'kode_part', 'nama', 'stok', 'minimal_stok',
        'harga_beli', 'harga_jual', 'supplier'
    ];

    public function kategori()
    {
        return $this->belongsTo(KategoriSparepart::class, 'kategori_id');
    }

    public function detailServis()
    {
        return $this->hasMany(DetailServis::class);
    }
}