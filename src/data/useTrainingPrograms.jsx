import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTrainingProgram,
  getTrainingPrograms,
  createTrainingProgram,
  updateTrainingProgram,
  removeTrainingProgram,
  putLesson,
  // getLessonsFromTrainingProgram,
  // postTrainingProgramMember,
  // putTrainingProgramMemberPosition,
  // removeMemberFromTrainingProgram,
} from "@/server/trainingProgramAction";
import {
  getJoinedTrainingProgram,
  postJoinedTrainingProgram,
} from "@/server/userTrainingAction";
import { removeLesson } from "@/server/lessonAction";

export const useGetTrainingPrograms = () => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => await getTrainingPrograms(),
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

export const useGetJoinedTrainingProgram = () => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => await getJoinedTrainingProgram(),
    queryKey: ["joined-trainingprograms"],
  });
};

export const usePostJoinedTrainingProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => await postJoinedTrainingProgram(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["joined-trainingprograms"]);
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
    mutationFn: async ({ programId, data }) =>
      await postTrainingProgramMember(programId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["trainingprograms"]);
      if (onSuccess) onSuccess();
    },
  });
};

export const usePutLesson = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => await putLesson(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["trainingprogram", id]);
    },
  });
};

export const useDeleteLesson = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids) => await removeLesson(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["trainingprogram", id]);
    },
  });
};

export const usePutTrainingProgramMemberPosition = (onSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ programId, data }) =>
      await putTrainingProgramMemberPosition(programId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["trainingprograms"]);
      if (onSuccess) onSuccess();
    },
  });
};

export const useRemoveMemberFromTrainingProgram = (onSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ programId, userId }) =>
      await removeMemberFromTrainingProgram(programId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["trainingprograms"]);
      if (onSuccess) onSuccess();
    },
  });
};
