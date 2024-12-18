import { WorkoutExercise } from '../../model/workoutexercise';

const validWorkoutExercise = {
    workout_exercise_id: 1,
    workout_id: 1,
    exercise_id: 1,
    sets: 3,
    reps: 12,
    rpe: '9-10',
    restTime: '00:30',
};

test(`given: valid values for WorkoutExercise properties; when: WorkoutExercise is created; then: properties are set correctly`, () => {
    // given
    const workoutexercise = new WorkoutExercise(validWorkoutExercise);

    // when & then
    expect(workoutexercise.workout_exercise_id).toEqual(validWorkoutExercise.workout_exercise_id);
    expect(workoutexercise.workout_id).toEqual(validWorkoutExercise.workout_id);
    expect(workoutexercise.exercise_id).toEqual(validWorkoutExercise.exercise_id);
    expect(workoutexercise.sets).toEqual(validWorkoutExercise.sets);
    expect(workoutexercise.reps).toEqual(validWorkoutExercise.reps);
    expect(workoutexercise.rpe).toEqual(validWorkoutExercise.rpe);
    expect(workoutexercise.restTime).toEqual(validWorkoutExercise.restTime);
});

test(`given: WorkoutExercise equals method called with matching properties; when: all properties match; then: return true`, () => {
    // given
    const workoutexercise = new WorkoutExercise(validWorkoutExercise);

    // when
    const isEqual = workoutexercise.equals({
        workout_exercise_id: 1,
        workout_id: 1,
        exercise_id: 1,
        sets: 3,
        reps: 12,
        rpe: '9-10',
        restTime: '00:30',
    });

    // then
    expect(isEqual).toBe(true);
});

test(`given: WorkoutExercise equals method called with non-matching properties; when: one or more properties don't match; then: return false`, () => {
    // given
    const workoutexercise = new WorkoutExercise(validWorkoutExercise);

    // when
    const isEqual = workoutexercise.equals({
        workout_exercise_id: 2,
        workout_id: 2,
        exercise_id: 2,
        sets: 4,
        reps: 10,
        rpe: '8-9',
        restTime: '00:50',
    });

    // then
    expect(isEqual).toBe(false);
});

test(`given: WorkoutExercise equals method called; when: only one field is different; then: return false`, () => {
    //given
    const workoutexercise = new WorkoutExercise(validWorkoutExercise);

    //when & then
    expect(workoutexercise.equals({ ...validWorkoutExercise, workout_id: 2 })).toBe(false);
    expect(workoutexercise.equals({ ...validWorkoutExercise, exercise_id: 2 })).toBe(false);
    expect(workoutexercise.equals({ ...validWorkoutExercise, sets: 2 })).toBe(false);
    expect(workoutexercise.equals({ ...validWorkoutExercise, reps: 2 })).toBe(false);
    expect(workoutexercise.equals({ ...validWorkoutExercise, rpe: '8-9' })).toBe(false);
    expect(workoutexercise.equals({ ...validWorkoutExercise, restTime: '50s' })).toBe(false);
});

test(`given: invalid sets; when: WorkoutExercise is created; then: an error is thrown`, () => {
    //given
    const invalidSets = { ...validWorkoutExercise, sets: -1 };

    //when
    const workoutExercise = () => new WorkoutExercise(invalidSets);

    //then
    expect(workoutExercise).toThrow('Invalid Sets: Must be a positive integer');
});

test(`given: invalid reps; when: WorkoutExercise is created; then: an error is thrown`, () => {
    //given
    const invalidReps = { ...validWorkoutExercise, reps: -1 };

    //when
    const workoutExercise = () => new WorkoutExercise(invalidReps);

    //then
    expect(workoutExercise).toThrow('Invalid Reps: Must be a positive integer');
});
