<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreReservasiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $user = auth()->user();

        $rules = [
            'motor_id' => ['required', 'exists:motors,id'],
            'layanan_id' => 'required|exists:layanan,id',
            'tanggal' => 'required|date|after_or_equal:today',
            'jam' => 'required|date_format:H:i',
            'keluhan' => 'nullable|string|max:1000',
        ];

        // If the user is a customer, add a rule to ensure the motor belongs to them.
        // This prevents a customer from making a reservation for someone else's motor.
        if ($user && $user->isCustomer() && $user->pelanggan) {
             $rules['motor_id'][] = Rule::exists('motors', 'id')->where('pelanggan_id', $user->pelanggan->id);
        }

        return $rules;
    }
}
