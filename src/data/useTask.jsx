import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks,getTask, getTasksByFilter, assignUserToTask, removeUserFromTask,createTask, updateTask,deleteTask} from "@/server/taskAction"
export const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => getTasks(),
    refetchOnWindowFocus: false,
  });
};

export const useGetTask = (id) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: async () => getTask(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetTasksByFilter = (filters) => {
  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: async () => getTasksByFilter(filters),
    refetchOnWindowFocus: false,
  });
};

export const useAssignUserToTask = (taskId, onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => await assignUserToTask(taskId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["task", taskId]);
      onClose();
    },
  });
};

export const useRemoveUserFromTask = (taskId, onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => await removeUserFromTask(taskId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["task", taskId]);
      onClose();
    },
  });
};

export const useCreateTask = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData) => await createTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      onClose();
    },
  });
};

export const useUpdateTask = (id, onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData) => await updateTask(id, taskData),
    onSuccess: () => {
      queryClient.invalidateQueries(["task", id]);
      queryClient.invalidateQueries(["tasks"]);
      onClose();
    },
  });
};

export const useDeleteTask = (id, onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      onClose();
    },
  });
};
