<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class PatientController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->query('per_page', 10);

        $patients = Patient::query()
            ->when($request->clinic_id, fn($q) => $q->where('clinic_id', $request->clinic_id))
            ->paginate($perPage);

        return response()->json($patients);
    }

    public function show(Patient $patient): JsonResponse
    {
        return response()->json($patient);
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name'             => 'required|string|max:50',
                'surnames'         => 'required|string|max:50',
                'birth_date'       => 'required|date',
                'dni'              => 'required|string|unique:patients,dni',
                'emergency_numbers' => 'required|string',
                'phone_number'     => 'required|string',
                'address'          => 'required|string',
                'consent'          => 'boolean',
                'active'           => 'boolean',
                'clinic_id' => 'required|exists:clinics,id',
                'user_id'          => 'required|exists:users,id',
            ]);

            return response()->json(Patient::create($validated), 201);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, Patient $patient): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name'             => 'sometimes|string|max:50',
                'surnames'         => 'sometimes|string|max:50',
                'birth_date'       => 'sometimes|date',
                'dni'              => 'sometimes|string|unique:patients,dni,' . $patient->id,
                'emergency_numbers' => 'sometimes|string',
                'phone_number'     => 'sometimes|string',
                'address'          => 'sometimes|string',
                'consent'          => 'sometimes|boolean',
                'active'           => 'sometimes|boolean',
                'user_id'          => 'sometimes|exists:users,id',
                'clinic_id' => 'sometimes|exists:clinics,id',
            ]);

            $patient->update($validated);
            return response()->json($patient);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Patient $patient): JsonResponse
    {
        try {
            $patient->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
