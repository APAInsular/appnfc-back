
<?php

use App\Http\Controllers\AuditController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BraceletController;
use App\Http\Controllers\ClinicController;
use App\Http\Controllers\PatientController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    // ? Auth
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
    
    // ? Auditory
    Route::get('audits/{model}/{id}', [AuditController::class, 'index']);
    
    // ? Bussines logic

    Route::apiResource('patients', PatientController::class);
    Route::apiResource('bracelets', BraceletController::class);
    Route::apiResource('clinics', ClinicController::class);

});