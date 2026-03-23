<?php

namespace Database\Factories;

use App\Models\Clinic;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Clinic>
 */
class ClinicFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'            => fake()->company(),
            'address'         => fake()->address(),
            'phone_number'    => fake()->phoneNumber(),
            'email'           => fake()->unique()->safeEmail(),
            'active'          => true,
            'nfc_reader_code' => fake()->unique()->bothify('NFC-####'),
        ];
    }
}
