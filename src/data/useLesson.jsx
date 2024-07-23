import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addLesson,
  getLesson,
  getLessons,
  removeLesson,
  updateLesson,
} from "@/server/lessonAction";
export const useGetLessons = () => {
  return useQuery({
    queryKey: ["lessons"],
    queryFn: async () => getLessons(),
    refetchOnWindowFocus: false,
  });
};

export const useGetLesson = (lessonId) => {
  return useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: async () => getLesson(lessonId),
    refetchOnWindowFocus: false,
  });
};

export const useUpdateLesson = (lessonId, onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => await updateLesson(lessonId, userData),
    onSuccess: () => {
      queryClient.invalidateQueries(["lesson", lessonId]);
      queryClient.invalidateQueries(["lessons"]);
      onClose();
    },
  });
};

export const useAddLesson = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => await addLesson(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["trainingprograms"]);
      onClose();
    },
  });
};

export const useRemoveLesson = (lessonId, onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await removeLesson(lessonId),
    onSuccess: () => {
      queryClient.invalidateQueries(["lessons"]);
      onClose();
    },
  });
};
