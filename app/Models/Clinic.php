<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

use OwenIt\Auditing\Auditable as AuditableTrait;
use OwenIt\Auditing\Contracts\Auditable;

#[Fillable(['name', 'address', 'phone_number', 'email', 'registered_date', 'active', 'nfc_reader_code'])]
class Clinic extends Model implements Auditable
{
    use HasFactory, AuditableTrait;


    public function patients(): HasMany
    {
        return $this->hasMany(Patient::class);
    }
}
