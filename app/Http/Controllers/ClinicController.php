<?php

namespace App\Http\Controllers;

use App\Models\Clinic;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ClinicController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->query('per_page', 10);
        return response()->json(Clinic::paginate($perPage));
    }

    public function show(Clinic $clinic): JsonResponse
    {
        return response()->json($clinic);
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name'            => 'required|string|unique:clinics,name',
                'address'         => 'required|string',
                'phone_number'    => 'required|string',
                'email'           => 'required|email|unique:clinics,email',
                'registered_date' => 'sometimes|date',
                'active'          => 'boolean',
                'nfc_reader_code' => 'required|string|unique:clinics,nfc_reader_code',
            ]);

            return response()->json(Clinic::create($validated), 201);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, Clinic $clinic): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name'            => 'sometimes|string|unique:clinics,name,' . $clinic->id,
                'address'         => 'sometimes|string',
                'phone_number'    => 'sometimes|string',
                'email'           => 'sometimes|email|unique:clinics,email,' . $clinic->id,
                'registered_date' => 'sometimes|date',
                'active'          => 'sometimes|boolean',
                'nfc_reader_code' => 'sometimes|string|unique:clinics,nfc_reader_code,' . $clinic->id,
            ]);

            $clinic->update($validated);
            return response()->json($clinic);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Clinic $clinic): JsonResponse
    {
        try {
            $clinic->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}