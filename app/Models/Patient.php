<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use OwenIt\Auditing\Auditable as AuditableTrait;
use OwenIt\Auditing\Contracts\Auditable;

#[Fillable(['name', 'surnames', 'birth_date', 'dni', 'emergency_numbers', 'phone_number', 'address', 'consent', 'active', 'user_id', 'clinic_id'])]
class Patient extends Model implements Auditable
{
    use HasFactory, AuditableTrait;
    protected array $auditExclude = ['updated_at'];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function clinic(): BelongsTo
    {
        return $this->belongsTo(Clinic::class);
    }
}
