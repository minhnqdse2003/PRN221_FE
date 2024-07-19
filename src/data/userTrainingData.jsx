import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserTrainings, getById, createUserTraining, removeUserTraining } from "@/server/userTrainingActions";

export const useGetUserTrainings = () => {
  return useQuery({
    queryKey: ["user-trainings"],
    queryFn: async () => getUserTrainings(),
    refetchOnWindowFocus: false,
  });
};

export const useGetUserTrainingById = (id) => {
  return useQuery({
    queryKey: ["user-training", id],
    queryFn: async () => getById(id),
    refetchOnWindowFocus: false,
  });
};

export const useCreateUserTraining = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (trainingProgramId) => await createUserTraining(trainingProgramId),
    onSuccess: () => {
      queryClient.invalidateQueries(["user-trainings"]);
      onClose();
    },
  });
};

export const useRemoveUserTraining = (id, onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await removeUserTraining(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["user-trainings"]);
      onClose();
    },
  });
};
