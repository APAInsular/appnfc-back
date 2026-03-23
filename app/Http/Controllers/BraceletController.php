<?php

namespace App\Http\Controllers;

use App\Models\Bracelet;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class BraceletController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $perPage = $request->query('per_page', 10);
            $bracelets = Bracelet::paginate($perPage);
            return response()->json($bracelets);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show(Bracelet $bracelet): JsonResponse
    {
        return response()->json($bracelet);
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'serial'          => 'required|string|unique:bracelets,serial',
                'model'           => 'required|string',
                'state'           => 'sometimes|in:disabled,assigned,unassigned',
                'assignment_date' => 'nullable|date',
                'last_sync'       => 'nullable|date',
                'qr_url'          => 'nullable|string',
                'patient_id'      => 'nullable|exists:patients,id',
            ]);

            $bracelet = Bracelet::create($validated);
            return response()->json($bracelet, 201);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, Bracelet $bracelet): JsonResponse
    {
        try {
            $validated = $request->validate([
                'serial'          => 'sometimes|string|unique:bracelets,serial,' . $bracelet->id,
                'model'           => 'sometimes|string',
                'state'           => 'sometimes|in:disabled,assigned,unassigned',
                'assignment_date' => 'nullable|date',
                'last_sync'       => 'nullable|date',
                'qr_url'          => 'nullable|string',
                'patient_id'      => 'nullable|exists:patients,id',
            ]);

            $bracelet->update($validated);
            return response()->json($bracelet);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Bracelet $bracelet): JsonResponse
    {
        try {
            $bracelet->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
