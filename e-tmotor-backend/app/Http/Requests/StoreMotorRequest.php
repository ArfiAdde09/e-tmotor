<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMotorRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $rules = [
            'pelanggan_id' => 'required|exists:pelanggan,id', // admin wajib
            'merk' => 'required|string|max:50',
            'tipe' => 'required|string|max:50',
            'tahun' => 'required|digits:4|integer|min:2000|max:' . date('Y'),
            'warna' => 'required|string|max:30',
            'plat_nomor' => 'required|string|max:20|unique:motor,plat_nomor',
            'nomor_rangka' => 'required|string|unique:motor,nomor_rangka',
            'nomor_mesin' => 'required|string|unique:motor,nomor_mesin',
            'spesifikasi_mesin' => 'nullable|string',
        ];

        // Jika yang request adalah pelanggan, pelanggan_id tidak perlu diinput (otomatis dari service)
        if (auth()->user()->role === 'pelanggan') {
            unset($rules['pelanggan_id']);
        }

        return $rules;
    }
}