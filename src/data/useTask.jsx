import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks,getTask, getTasksByFilter, assignUsersToTask, removeUserFromTask,createTask, updateTask,deleteTask} from "@/server/taskAction"
export const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => await getTasks(),
    refetchOnWindowFocus: false,
  });
};

export const useGetTask = (id) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: async () => await getTask(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetTasksByFilter = (filters) => {
  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: async () => await getTasksByFilter(filters),
    refetchOnWindowFocus: false,
  });
};

export const useAssignUsersToTask = (taskId, onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "assignUsersToTask",
    mutationFn: async ( taskId, userIds) => await assignUsersToTask(taskId, userIds),
    onSuccess: () => {
      queryClient.invalidateQueries(["task", taskId]);
      onClose();
    },
    onError: (error) => {
      console.error("Error assigning users to task:", error);
    },
  });
};

export const useRemoveUserFromTask = (taskId, onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["removeUsersToTask", taskId],
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
    mutationKey: ["createTask"],
    mutationFn: async (taskData) => await createTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      onClose();
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (data) => await updateTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => await deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },

  });
};
