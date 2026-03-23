<?php

namespace Tests\Feature;

use App\Models\Clinic;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClinicTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_can_list_clinics(): void
    {
        Clinic::factory()->count(3)->create();

        $this->actingAs($this->user, 'sanctum')
            ->getJson('/api/clinics')
            ->assertStatus(200)
            ->assertJsonStructure(['data', 'total', 'per_page']);
    }

    public function test_can_create_clinic(): void
    {
        $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/clinics', [
                'name'            => 'Clinica Test',
                'address'         => 'Calle Test 1',
                'phone_number'    => '900000000',
                'email'           => 'clinica@test.com',
                'active'          => true,
                'nfc_reader_code' => 'NFC-0001',
            ])
            ->assertStatus(201)
            ->assertJsonFragment(['name' => 'Clinica Test']);
    }

    public function test_can_update_clinic(): void
    {
        $clinic = Clinic::factory()->create();

        $this->actingAs($this->user, 'sanctum')
            ->putJson("/api/clinics/{$clinic->id}", [
                'name' => 'Clinica Actualizada',
            ])
            ->assertStatus(200)
            ->assertJsonFragment(['name' => 'Clinica Actualizada']);
    }

    public function test_can_delete_clinic(): void
    {
        $clinic = Clinic::factory()->create();

        $this->actingAs($this->user, 'sanctum')
            ->deleteJson("/api/clinics/{$clinic->id}")
            ->assertStatus(204);

        $this->assertDatabaseMissing('clinics', ['id' => $clinic->id]);
    }

    public function test_unauthenticated_user_cannot_access_clinics(): void
    {
        $this->getJson('/api/clinics')
            ->assertStatus(401);
    }
}