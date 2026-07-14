<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePelangganRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
{
    return [
        'user_id' => 'sometimes|exists:users,id',
        'nik' => 'sometimes|string|size:16|unique:pelanggan,nik,' . $this->pelanggan,
        'tanggal_lahir' => 'sometimes|date',
        'jenis_kelamin' => 'sometimes|in:L,P',
    ];
}
}
