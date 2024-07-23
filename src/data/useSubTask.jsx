import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubTask, updateSubTask,deleteSubTask } from "@/server/subTaskAction";

export const useCreateSubTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: 'createSubTask',
    mutationFn: async (taskData) => await createSubTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries(["subtasks"]);
    },
  });
};

export const useUpdateSubTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "updateSubTask",
    mutationFn: async (taskData) => await updateSubTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries(["subtasks"]);
    },
  });
};

export const useDeleteSubTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: 'deleteSubTask',
    mutationFn: async (id) => await deleteSubTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["subtasks"]);
    },
  });
};
