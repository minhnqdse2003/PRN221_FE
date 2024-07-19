import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBase } from "./baseAction";

export const useCreateSubTask = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData) => await createSubTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries(["subtasks"]);
      onClose();
    },
  });
};

export const useUpdateSubTask = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData) => await updateSubTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries(["subtasks"]);
      onClose();
    },
  });
};

export const useDeleteSubTask = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => await deleteSubTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["subtasks"]);
      onClose();
    },
  });
};
