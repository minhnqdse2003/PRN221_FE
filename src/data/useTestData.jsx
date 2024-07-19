import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllTest, getTestById, createTest, updateTest, removeTest } from "@/server/testInterViewAction";

export const useGetAllTests = () => {
  return useQuery({
    queryKey: ["tests"],
    queryFn: async () => getAllTest(),
    refetchOnWindowFocus: false,
  });
};

export const useGetTestById = (id) => {
  return useQuery({
    queryKey: ["test", id],
    queryFn: async () => getTestById(id),
    refetchOnWindowFocus: false,
  });
};

export const useCreateTest = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (testData) => await createTest(testData),
    onSuccess: () => {
      queryClient.invalidateQueries(["tests"]);
      onClose();
    },
  });
};

export const useUpdateTest = (id, onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (testData) => await updateTest(id, testData),
    onSuccess: () => {
      queryClient.invalidateQueries(["test", id]);
      queryClient.invalidateQueries(["tests"]);
      onClose();
    },
  });
};

export const useRemoveTest = (id, onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await removeTest(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["tests"]);
      onClose();
    },
  });
};
