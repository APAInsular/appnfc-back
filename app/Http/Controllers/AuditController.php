<?php

namespace App\Http\Controllers;

use OwenIt\Auditing\Models\Audit;

class AuditController extends Controller
{
    public function index(string $model, int $id)
    {
        return Audit::where('auditable_type', 'App\\Models\\' . $model)
            ->where('auditable_id', $id)
            ->with('user:id,name')
            ->latest()
            ->get();
    }
}