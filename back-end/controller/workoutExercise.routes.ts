import express, { Router, Request, Response, NextFunction } from "express";
import workoutexerciseService from "../service/workoutexercise.service";
import { WorkoutExerciseInput } from "../types";

const workoutExerciseRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     WorkoutExercise:
 *       type: object
 *       properties:
 *         workout_exercise_id:
 *           type: number
 *           format: int64
 *         workout_id:
 *           type: number
 *           format: int64
 *         exercise_id:
 *           type: number
 *           format: int64
 *         sets:
 *           type: integer
 *         reps:
 *           type: integer
 *         rpe:
 *           type: string
 *         rest_time:
 *           type: string
 *           description: Rest time in MM:SS format
 *     WorkoutExerciseInput:
 *       type: object
 *       properties:
 *         workout_id:
 *           type: number
 *           format: int64
 *         exercise_id:
 *           type: number
 *           format: int64
 *         sets:
 *           type: integer
 *         reps:
 *           type: integer
 *         rpe:
 *           type: string
 *         rest_time:
 *           type: string
 *           description: Rest time in MM:SS format
 */

/**
 * @swagger
 * /workoutexercises:
 *   get:
 *     summary: Get all workout exercises
 *     tags: [WorkoutExercises]
 *     description: Retrieve a list of all workout exercises.
 *     responses:
 *       200:
 *         description: A list of workout exercises.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkoutExercise'
 */
workoutExerciseRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const workoutExercises = workoutexerciseService.getAllWorkoutExercises();
        res.status(200).json(workoutExercises);
    } catch (error: any) {
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /workoutexercises/{id}:
 *   get:
 *     summary: Get a workout exercise by ID
 *     tags: [WorkoutExercises]
 *     description: Retrieve a single workout exercise by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The workout exercise ID
 *     responses:
 *       200:
 *         description: A workout exercise object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutExercise'
 *       404:
 *         description: Workout exercise not found
 */
workoutExerciseRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const workoutExerciseId = parseInt(req.params.id);
        const workoutExercise = workoutexerciseService.getWorkoutExerciseById(workoutExerciseId);
        res.status(200).json(workoutExercise);
    } catch (error: any) {
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /workoutexercises/workout/{id}:
 *   get:
 *     summary: Get workout exercises by workout ID
 *     tags: [WorkoutExercises]
 *     description: Retrieve all workout exercises associated with a specific workout.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The workout ID
 *     responses:
 *       200:
 *         description: A list of workout exercises.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkoutExercise'
 *       404:
 *         description: No workout exercises found for the specified workout ID
 */
workoutExerciseRouter.get('/workout/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const workoutId = parseInt(req.params.id);
        const workoutExercises = workoutexerciseService.getWorkoutExercisesByWorkoutId(workoutId);
        res.status(200).json(workoutExercises);
    } catch (error: any) {
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /workoutexercises:
 *   post:
 *     summary: Create a new workout exercise
 *     tags: [WorkoutExercises]
 *     description: Create a new workout exercise entry in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkoutExerciseInput'
 *     responses:
 *       200:
 *         description: The created workout exercise object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutExercise'
 */
workoutExerciseRouter.post('/', (req: Request, res: Response) => {
    try {
        const workoutExerciseInput: WorkoutExerciseInput = req.body;
        const newWorkoutExercise = workoutexerciseService.createWorkoutExercise(workoutExerciseInput);
        res.status(200).json(newWorkoutExercise);
    } catch (error: any) {
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

export default workoutExerciseRouter;