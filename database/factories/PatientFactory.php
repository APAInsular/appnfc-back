<?php

namespace Database\Factories;

use App\Models\Clinic;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'              => fake()->firstName(),
            'surnames'          => fake()->lastName(),
            'birth_date'        => fake()->date(),
            'dni'               => fake()->unique()->bothify('########?'),
            'emergency_numbers' => fake()->phoneNumber(),
            'phone_number'      => fake()->phoneNumber(),
            'address'           => fake()->address(),
            'consent'           => true,
            'active'            => true,
            'clinic_id'         => Clinic::factory(),
            'user_id'           => User::factory(),
        ];
    }
}
