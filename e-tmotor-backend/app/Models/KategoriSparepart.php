<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KategoriSparepart extends Model
{
    protected $table = 'kategori_sparepart';
    protected $fillable = ['nama', 'deskripsi'];

    public function spareparts()
    {
        return $this->hasMany(Sparepart::class, 'kategori_id');
    }
}