import { addMember, getMember, putMember } from "@/server/memberAction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetMembers = () => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => getMember(),
    queryKey: ["members"],
  });
};

export const usePutMembers = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => await putMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["members"]);
      onClose();
    },
    onError: () => {
      queryClient.invalidateQueries(["members"]);
    },
  });
};

export const useAddMember = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => await addMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["members"]);
      if (onClose) onClose();
    },
    onError: () => {
      queryClient.invalidateQueries(["members"]);
    },
  });
};
