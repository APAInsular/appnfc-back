<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bracelets', function (Blueprint $table) {
            $table->id();
            $table->string('serial')->unique();
            $table->string('model');
            $table->enum('state', ['disabled', 'assigned', 'unassigned'])->default('unassigned');
            $table->date('assignment_date')->nullable();
            $table->date('last_sync')->nullable();
            $table->string('qr_url')->nullable();
            $table->foreignId('patient_id')->nullable()->unique()->constrained()->nullOnDelete();

            $table->index('state');
            $table->index('patient_id');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bracalets');
    }
};
