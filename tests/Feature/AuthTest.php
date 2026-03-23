<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email'    => $user->email,
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['token']);
    }

    public function test_invalid_credentials_return_401(): void
    {
        $response = $this->postJson('/api/login', [
            'email'    => 'fake@email.com',
            'password' => 'wrong',
        ]);
        $response->assertStatus(401);
    }

    public function test_authenticated_user_can_get_patients(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/patients');

        $response->assertStatus(200);
    }
}
