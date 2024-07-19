import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTrainingProgram,
  getTrainingPrograms,
  createTrainingProgram,
  updateTrainingProgram,
  removeTrainingProgram,
  getLessonsFromTrainingProgram,
  postTrainingProgramMember,
  putTrainingProgramMemberPosition,
  removeMemberFromTrainingProgram,
} from "./trainingProgramAction";

export const useGetTrainingPrograms = () => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => getTrainingPrograms(),
    queryKey: ["trainingprograms"],
  });
};

export const useGetTrainingProgram = (id) => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => getTrainingProgram(id),
    queryKey: ["trainingprogram", id],
  });
};

export const useCreateTrainingProgram = (onSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => await createTrainingProgram(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["trainingprograms"]);
      if (onSuccess) onSuccess();
    },
  });
};

export const useUpdateTrainingProgram = (onSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => await updateTrainingProgram(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["trainingprograms"]);
      if (onSuccess) onSuccess();
    },
  });
};

export const useRemoveTrainingProgram = (onSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => await removeTrainingProgram(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["trainingprograms"]);
      if (onSuccess) onSuccess();
    },
  });
};

export const useGetLessonsFromTrainingProgram = (id) => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => getLessonsFromTrainingProgram(id),
    queryKey: ["trainingprogram", id, "lessons"],
  });
};

export const usePostTrainingProgramMember = (onSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ programId, data }) => await postTrainingProgramMember(programId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["trainingprograms"]);
      if (onSuccess) onSuccess();
    },
  });
};

export const usePutTrainingProgramMemberPosition = (onSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ programId, data }) => await putTrainingProgramMemberPosition(programId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["trainingprograms"]);
      if (onSuccess) onSuccess();
    },
  });
};


export const useRemoveMemberFromTrainingProgram = (onSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ programId, userId }) => await removeMemberFromTrainingProgram(programId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["trainingprograms"]);
      if (onSuccess) onSuccess();
    },
  });
};
