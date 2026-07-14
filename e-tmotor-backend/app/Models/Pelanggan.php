<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelanggan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nama_lengkap',
        'telepon',
        'alamat',
    ];

    /**
     * Get the user that owns the pelanggan.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the motors for the pelanggan.
     */
    public function motors()
    {
        return $this->hasMany(Motor::class);
    }

    /**
     * Get the reservasis for the pelanggan.
     */
    public function reservasis()
    {
        return $this->hasMany(Reservasi::class);
    }
}