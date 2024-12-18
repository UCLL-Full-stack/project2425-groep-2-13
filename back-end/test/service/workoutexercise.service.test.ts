import workoutexerciseDb from '../../repository/workoutexercise.db';
import workoutexerciseService from '../../service/workoutexercise.service';
import { WorkoutExerciseInput } from '../../types';

let mockWorkoutExerciseDbGetAllWorkoutExercises: jest.Mock;
let mockWorkoutExerciseDbGetWorkoutExerciseById: jest.Mock;
let MockWorkoutExerciseDbGetWorkoutExercisesByWorkoutId: jest.Mock;
let mockWorkoutExerciseDbCreateWorkoutExercise: jest.Mock;

const workoutExercises: WorkoutExerciseInput[] = [
    {
        workout_exercise_id: 1,
        workout_id: 1,
        exercise_id: 1,
        sets: 3,
        reps: 10,
        rpe: '8-9',
        restTime: '00:30s',
    },
    {
        workout_exercise_id: 2,
        workout_id: 1,
        exercise_id: 2,
        sets: 3,
        reps: 10,
        rpe: '8-9',
        restTime: '00:30s',
    },
];

beforeEach(() => {
    mockWorkoutExerciseDbGetAllWorkoutExercises = jest.fn();
    mockWorkoutExerciseDbGetWorkoutExerciseById = jest.fn();
    MockWorkoutExerciseDbGetWorkoutExercisesByWorkoutId = jest.fn();
    mockWorkoutExerciseDbCreateWorkoutExercise = jest.fn();
});
afterEach(() => {
    jest.clearAllMocks();
});

test(`given: no workout exercises; when: fetching all the workout exercises; then: an error is thrown`, () => {
    //given
    workoutexerciseDb.getAllWorkoutExercises =
        mockWorkoutExerciseDbGetAllWorkoutExercises.mockReturnValue(null);

    //when
    const getWorkoutExercises = () => workoutexerciseService.getAllWorkoutExercises();

    //then
    expect(getWorkoutExercises).toThrow('No workout exercises found');
    expect(workoutexerciseDb.getAllWorkoutExercises).toHaveBeenCalled();
});

test(`given: workout exercises; when: fetching all the workout exercises; then: the workout exercises are returned`, () => {
    //given
    workoutexerciseDb.getAllWorkoutExercises =
        mockWorkoutExerciseDbGetAllWorkoutExercises.mockReturnValue(workoutExercises);

    //when
    const result = workoutexerciseService.getAllWorkoutExercises();

    //then
    expect(result).toEqual(workoutExercises);
    expect(workoutexerciseDb.getAllWorkoutExercises).toHaveBeenCalled();
});

test(`given: invalid ID; when: fetching a workout exercise by ID; then: an error is thrown`, () => {
    //given
    const id = 1;
    workoutexerciseDb.getWorkoutExerciseById =
        mockWorkoutExerciseDbGetWorkoutExerciseById.mockReturnValue(null);

    //when
    const getWorkoutExerciseById = () => workoutexerciseService.getWorkoutExerciseById(id);

    //then
    expect(getWorkoutExerciseById).toThrow(`Workout exercise with ID ${id} not found`);
    expect(workoutexerciseDb.getWorkoutExerciseById).toHaveBeenCalledWith(id);
});

test(`given: valid ID; when: fetching a workout exercise by ID; then: the workout exercise is returned`, () => {
    //given
    const id = 1;
    workoutexerciseDb.getWorkoutExerciseById =
        mockWorkoutExerciseDbGetWorkoutExerciseById.mockReturnValue(workoutExercises[0]);

    //when
    const result = workoutexerciseService.getWorkoutExerciseById(1);

    //then
    expect(result).toEqual(workoutExercises[0]);
    expect(workoutexerciseDb.getWorkoutExerciseById).toHaveBeenCalledWith(id);
});

test(`given: invalid workout ID; when: fetching workout exercises by workout ID; then: an error is thrown`, () => {
    //given
    const id = 1;
    workoutexerciseDb.getWorkoutExercisesByWorkoutId =
        MockWorkoutExerciseDbGetWorkoutExercisesByWorkoutId.mockReturnValue([]);

    //when
    const getWorkoutExercisesByWorkoutId = () =>
        workoutexerciseService.getWorkoutExercisesByWorkoutId(id);

    //then
    expect(getWorkoutExercisesByWorkoutId).toThrow(
        `No workout exercises found for workout with ID ${id}`
    );
    expect(workoutexerciseDb.getWorkoutExercisesByWorkoutId).toHaveBeenCalledWith(id);
});

test(`given: valid workout ID; when: fetching workout exercises by workout ID; then: the workout exercises are returned`, () => {
    //given
    const id = 1;
    workoutexerciseDb.getWorkoutExercisesByWorkoutId =
        MockWorkoutExerciseDbGetWorkoutExercisesByWorkoutId.mockReturnValue(workoutExercises);

    //when
    const result = workoutexerciseService.getWorkoutExercisesByWorkoutId(id);

    //then
    expect(result).toEqual(workoutExercises);
    expect(workoutexerciseDb.getWorkoutExercisesByWorkoutId).toHaveBeenCalledWith(id);
});

test(`given: invalid workout exercise input; when: creating a workout exercise; then: an error is thrown`, () => {
    //given
    const workoutExerciseInput = workoutExercises[0];
    workoutexerciseDb.getWorkoutExerciseById =
        mockWorkoutExerciseDbGetWorkoutExerciseById.mockReturnValue(workoutExerciseInput);

    //when
    const createWorkoutExercise = () =>
        workoutexerciseService.createWorkoutExercise(workoutExerciseInput);

    //then
    expect(createWorkoutExercise).toThrow(
        `Workout exercise with ID ${workoutExerciseInput.workout_exercise_id} already exists`
    );
    expect(workoutexerciseDb.getWorkoutExerciseById).toHaveBeenCalledWith(
        workoutExerciseInput.workout_exercise_id
    );
});

test(`given: invalid workout exercise input; when: creating a workout exercise; then: an error is thrown`, () => {
    //given
    const workoutExerciseInput = workoutExercises[0];
    workoutexerciseDb.getWorkoutExerciseById =
        mockWorkoutExerciseDbGetWorkoutExerciseById.mockReturnValue(null);
    workoutexerciseDb.getWorkoutExercisesByWorkoutId =
        MockWorkoutExerciseDbGetWorkoutExercisesByWorkoutId.mockReturnValue(workoutExercises);

    //when
    const createWorkoutExercise = () =>
        workoutexerciseService.createWorkoutExercise(workoutExerciseInput);

    //then
    expect(createWorkoutExercise).toThrow(
        `Workout exercise with workout ID ${workoutExerciseInput.workout_id} and exercise ID ${workoutExerciseInput.exercise_id} already exists`
    );
    expect(workoutexerciseDb.getWorkoutExerciseById).toHaveBeenCalledWith(
        workoutExerciseInput.workout_exercise_id
    );
    expect(workoutexerciseDb.getWorkoutExercisesByWorkoutId).toHaveBeenCalledWith(
        workoutExerciseInput.workout_id
    );
});

test(`given: valid workout exercise input; when: creating a workout exercise; then: the workout exercise is created`, () => {
    //given
    const workoutExerciseInput = workoutExercises[0];
    workoutexerciseDb.getWorkoutExerciseById =
        mockWorkoutExerciseDbGetWorkoutExerciseById.mockReturnValue(null);
    workoutexerciseDb.getWorkoutExercisesByWorkoutId =
        MockWorkoutExerciseDbGetWorkoutExercisesByWorkoutId.mockReturnValue([]);
    workoutexerciseDb.createWorkoutExercise =
        mockWorkoutExerciseDbCreateWorkoutExercise.mockReturnValue(workoutExerciseInput);

    //when
    const result = workoutexerciseService.createWorkoutExercise(workoutExerciseInput);

    //then
    expect(result).toEqual(workoutExerciseInput);
    expect(workoutexerciseDb.getWorkoutExerciseById).toHaveBeenCalledWith(
        workoutExerciseInput.workout_exercise_id
    );
    expect(workoutexerciseDb.getWorkoutExercisesByWorkoutId).toHaveBeenCalledWith(
        workoutExerciseInput.workout_id
    );
    expect(workoutexerciseDb.createWorkoutExercise).toHaveBeenCalledWith(workoutExerciseInput);
});
