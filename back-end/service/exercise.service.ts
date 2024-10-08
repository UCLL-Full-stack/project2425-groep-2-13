import exerciseDb from '../model/data-access/exercise.db';
import { Exercise } from '../model/exercise';

const getAllExercises = (): Exercise[] => {
    const exercises = exerciseDb.getAllExercises();
    return exercises;
};

const getExerciseById = (id: number): Exercise => {
    const exercise = exerciseDb.getExerciseById(id);
    return exercise;
};

export default { getAllExercises, getExerciseById };
