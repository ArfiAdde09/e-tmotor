<?php

namespace App\Services;

use App\Models\Reservasi;
use Illuminate\Support\Facades\Auth;

class ReservasiService
{
    /**
     * Create a new reservation for the authenticated user.
     *
     * @param array $data The validated data from the request.
     * @return Reservasi The newly created reservation.
     */
    public function create(array $data): Reservasi
    {
        $user = Auth::user();
        $pelanggan = $user->pelanggan;

        if (!$pelanggan) {
            // This should ideally not be reached if validation is correct, but it's a good safeguard.
            abort(403, 'Profil pelanggan tidak ditemukan untuk pengguna ini.');
        }

        // Inject the pelanggan_id from the authenticated user
        $data['pelanggan_id'] = $pelanggan->id;

        // Set initial status
        $data['status'] = 'Menunggu';
        
        // Generate a unique queue number (e.g., RSV-YYYYMMDD-001)
        $date_for_antrian = $data['tanggal'];
        $count_today = Reservasi::where('tanggal', $date_for_antrian)->count();
        $data['nomor_antrian'] = 'RSV-' . date('Ymd', strtotime($date_for_antrian)) . '-' . str_pad($count_today + 1, 3, '0', STR_PAD_LEFT);

        return Reservasi::create($data);
    }
}
