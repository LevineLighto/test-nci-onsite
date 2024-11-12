<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransaksiRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'no_transaksi'  => ['required', 'string'],
            'uang_bayar'    => ['required', 'numeric'],
            'tgl_transaksi' => ['required', 'string'],
            'total'         => ['required', 'numeric'],

            'customer.kode_customer' => ['required', 'string'],

            'items'                 => ['required', 'array', 'min:1'],
            'items.*.kode_barang'   => ['required', 'string'],
            'items.*.date'          => ['required', 'string'],
            'items.*.qty'           => ['required', 'numeric'],
        ];
    }
}
