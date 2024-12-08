/**
 * @swagger
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         workout_id:
 *           type: number
 *           format: int64
 *         user_id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         exercises:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Exercise'
 *     WorkoutInput:
 *       type: object
 *       properties:
 *         workout_id:
 *           type: number
 *           format: int64
 *         user_id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         exercises:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ExerciseInput'
 *     Exercise:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         video_link:
 *           type: string
 *     ExerciseInput:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         video_link:
 *           type: string
 */

import express, { Router, Request, Response, NextFunction } from "express";
import workoutService from "../service/workout.service";

const workoutRouter = express.Router();

/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Get all workouts
 *     tags: [Workouts]
 *     description: Retrieve a list of all workouts.
 *     responses:
 *       200:
 *         description: A list of workouts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
workoutRouter.get('/', (req: Request, res: Response) => {
    try{
        const workouts = workoutService.getAllWorkouts()
        res.status(200).json(workouts)
    } catch (error: any) { 
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /workouts/{id}:
 *   get:
 *     summary: Get a workout by ID
 *     tags: [Workouts]
 *     description: Retrieve a single workout by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The workout ID
 *     responses:
 *       200:
 *         description: A workout object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
workoutRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try{
        const workoutId = parseInt(req.params.id)
        const workout = workoutService.getWorkoutById(workoutId)
        res.status(200).json(workout)
    } catch (error: any) { 
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
})

/**
 * @swagger
 * /workouts/user/{id}:
 *   get:
 *     summary: Get workouts by user ID
 *     tags: [Workouts]
 *     description: Retrieve workouts associated with a specific user.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of workouts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
workoutRouter.get('/user/:id', (req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = parseInt(req.params.id)
        const workouts = workoutService.getWorkoutsByUserId(userId)
        res.status(200).json(workouts)
    } catch (error: any) { 
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
    }
)

/**
 * @swagger
 * /workouts:
 *   post:
 *     summary: Create a new workout
 *     tags: [Workouts]
 *     description: Create a new workout entry in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkoutInput'
 *     responses:
 *       200:
 *         description: The created workout object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutInput'
 */
workoutRouter.post('/', async (req: Request, res: Response) => {
    try {
        const workoutInput = req.body;
        const newWorkout = await workoutService.createWorkout(workoutInput); 
        res.status(200).json(newWorkout);
    } catch (error: any) { 
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});



/**
 * @swagger
 * /workouts/{workoutId}/exercises/{exerciseId}:
 *   post:
 *     summary: Add an exercise to a workout
 *     tags: [Workouts]
 *     description: Add an exercise to a specific workout by their IDs.
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The workout ID
 *       - in: path
 *         name: exerciseId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The exercise ID
 *     responses:
 *       200:
 *         description: The updated workout object with the new exercise.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Workout or exercise not found
 */
workoutRouter.post('/:workoutId/exercises/:exerciseId', (req: Request, res: Response, next: NextFunction) => {
    try {
        const workoutId = parseInt(req.params.workoutId);
        const exerciseId = parseInt(req.params.exerciseId);
        const updatedWorkout = workoutService.addExerciseToWorkout(workoutId, exerciseId);
        res.status(200).json(updatedWorkout);
    } catch (error: any) {
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /workouts/{workoutId}/exercises/{exerciseId}:
 *   delete:
 *     summary: Remove an exercise from a workout
 *     tags: [Workouts]
 *     description: Remove an exercise from a specific workout by their IDs.
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The workout ID
 *       - in: path
 *         name: exerciseId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The exercise ID
 *     responses:
 *       200:
 *         description: The updated workout object without the exercise.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Workout or exercise not found
 */
workoutRouter.delete('/:workoutId/exercises/:exerciseId', (req: Request, res: Response) => {
    try {
        const workoutId = parseInt(req.params.workoutId);
        const exerciseId = parseInt(req.params.exerciseId);
        const updatedWorkout = workoutService.removeExerciseFromWorkout(workoutId, exerciseId);
        res.status(200).json(updatedWorkout);
    } catch (error: any) {
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /workouts/{id}:
 *   delete:
 *     summary: Remove a workout
 *     tags: [Workouts]
 *     description: Remove a workout by its ID and return the removed workout.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The workout ID
 *     responses:
 *       200:
 *         description: The removed workout object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Workout not found
 */
workoutRouter.delete('/:id', (req: Request, res: Response) => {
    try {
        const workoutId = parseInt(req.params.id);
        const deletedWorkout = workoutService.removeWorkout(workoutId);
        res.status(200).json(deletedWorkout);
    } catch (error: any) {
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});


export default workoutRouter;
