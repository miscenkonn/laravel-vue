<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Requests\MarkTaskCompletedRequest;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?? 10;
        $completed = $request->completed;

        $query = Task::query();

        if ($request->has('completed')) {
            $query->where('completed', '=', $completed == 'true' ? 1 : 0);
        }

        return $query->orderBy('id', 'desc')->paginate($limit);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        return Task::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        try {
            return Task::findOrFail($id);
        }
        catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Task not found'], 404);
        }
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        error_log($request);

        $task->update($request->validated());

        return $task;
    }

    /**
     * Mark task as completed
     */
    public function markCompleted(MarkTaskCompletedRequest $request, $id)
    {
        $task = Task::findOrFail($id);

        error_log($request);

        $task->update($request->validated());

        return $task;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $task = Task::findOrFail($id);
            $task->delete();
        }
        catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Task not found'], 404);
        }
    }
}
