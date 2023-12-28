<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MarkTaskCompletedRequest extends FormRequest
{
  public function rules(): array
  {
      return [
          'completed' => 'required|boolean',
      ];
  }
}
