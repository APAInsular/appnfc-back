<?php

namespace Tests\Feature;

use App\Models\Clinic;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PatientTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_can_list_patients(): void
    {
        Patient::factory()->count(3)->create();

        $this->actingAs($this->user, 'sanctum')
            ->getJson('/api/patients')
            ->assertStatus(200)
            ->assertJsonStructure(['data', 'total', 'per_page']);
    }

    public function test_can_create_patient(): void
    {
        $clinic = Clinic::factory()->create();

        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/patients', [
                'name'              => 'Juan',
                'surnames'          => 'García',
                'birth_date'        => '1990-01-01',
                'dni'               => '12345678A',
                'emergency_numbers' => '600000000',
                'phone_number'      => '611111111',
                'address'           => 'Calle Mayor 1',
                'consent'           => true,
                'active'            => true,
                'user_id'           => $this->user->id,
                'clinic_id'         => $clinic->id,
            ])
            ->assertStatus(201)
            ->assertJsonFragment(['dni' => '12345678A']);

    }

    public function test_can_update_patient(): void
    {
        $patient = Patient::factory()->create();

        $this->actingAs($this->user, 'sanctum')
            ->putJson("/api/patients/{$patient->id}", [
                'name' => 'Pedro',
            ])
            ->assertStatus(200)
            ->assertJsonFragment(['name' => 'Pedro']);
    }

    public function test_can_delete_patient(): void
    {
        $patient = Patient::factory()->create();

        $this->actingAs($this->user, 'sanctum')
            ->deleteJson("/api/patients/{$patient->id}")
            ->assertStatus(204);

        $this->assertDatabaseMissing('patients', ['id' => $patient->id]);
    }

    public function test_unauthenticated_user_cannot_access_patients(): void
    {
        $this->getJson('/api/patients')
            ->assertStatus(401);
    }
}