<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailServis extends Model
{
    protected $table = 'detail_servis';
    protected $fillable = ['servis_id', 'sparepart_id', 'qty', 'harga', 'subtotal'];

    public function servis()
    {
        return $this->belongsTo(Servis::class);
    }

    public function sparepart()
    {
        return $this->belongsTo(Sparepart::class);
    }
}