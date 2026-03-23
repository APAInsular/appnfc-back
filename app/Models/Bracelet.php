<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use OwenIt\Auditing\Auditable as AuditableTrait;
use OwenIt\Auditing\Contracts\Auditable;

#[Fillable(['serial', 'model', 'state', 'assignment_date', 'last_sync', 'qr_url', 'patient_id'])]
class Bracelet extends Model implements Auditable
{
    use HasFactory, AuditableTrait;


    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }
}
