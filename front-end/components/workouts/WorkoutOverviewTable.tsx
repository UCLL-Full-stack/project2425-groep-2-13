import { Workout } from "@/types";
import { useState } from "react";
import Modal from "./Modal";
import WorkoutService from "@/services/workout/WorkoutService";
import { toast, Toaster } from "sonner";
import { Plus } from "react-feather";
import WorkoutInfo from "./WorkoutInfo";

type Props = {
  workouts: Array<Workout>;
  setWorkouts: (workouts: Array<Workout>) => void;
};

const WorkoutOverviewTable: React.FC<Props> = ({ workouts, setWorkouts }) => {
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(
    null
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleWorkout = (workoutId: string) => {
    setSelectedWorkoutId(selectedWorkoutId === workoutId ? null : workoutId);
  };

  const handleAddNewWorkout = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitWorkout = (event: any) => {
    event.preventDefault();
    handleCloseModal();
  };

  const handleRemoveExercise = async (exerciseId: string) => {
    if (selectedWorkoutId !== null) {
      try {
        await WorkoutService.removeExerciseFromWorkout(
          selectedWorkoutId,
          exerciseId
        );
        const updatedWorkouts = workouts.map((workout) => {
          if (workout.id === selectedWorkoutId) {
            return {
              ...workout,
              exercises: workout.exercises.filter(
                (exercise) => exercise.id !== exerciseId
              ),
            };
          }
          return workout;
        });
        setWorkouts(updatedWorkouts);
        toast.success("Exercise removed successfully!");
      } catch (error) {
        toast.error("Failed to remove exercise from workout");
        console.error("Failed to remove exercise from workout", error);
      }
    }
  };

  const handleRemoveWorkout = async (workoutId: string) => {
    try {
      await WorkoutService.removeWorkout(workoutId);
      const updatedWorkouts = workouts.filter(
        (workout) => workout.id !== workoutId
      );
      setWorkouts(updatedWorkouts);
      toast.success("Workout removed successfully!");
    } catch (error) {
      toast.error("Failed to remove workout");
      console.error("Failed to remove workout", error);
    }
  };

  return (
    <div className="space-y-6">
      {workouts.map((workout) => (
        <div
          key={workout.id}
          className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden"
        >
          <div
            onClick={() => toggleWorkout(workout.id)}
            className="px-6 py-4 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {workout.name}
            </h2>
            <p className="text-sm text-gray-600">{workout.description}</p>
          </div>
          {selectedWorkoutId === workout.id && (
            <div className="px-6 pb-4">
              <WorkoutInfo
                workout={workout}
                onRemoveExercise={handleRemoveExercise}
                onRemoveWorkout={() => handleRemoveWorkout(workout.id)}
              />
            </div>
          )}
        </div>
      ))}
      <div
        className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-md rounded-lg border border-blue-300 cursor-pointer hover:shadow-lg hover:border-blue-400 transition-all flex justify-center items-center py-4"
        onClick={handleAddNewWorkout}
      >
        <div className="flex items-center space-x-2">
          <Plus className="text-blue-600 w-6 h-6" />
          <span className="text-blue-600 font-medium">Add New Workout</span>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-bold mb-4">Add New Workout</h2>
        <form onSubmit={handleSubmitWorkout}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Workout Name
            </label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              rows={3}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </Modal>

      <Toaster richColors />
    </div>
  );
};

export default WorkoutOverviewTable;
