import { getMember } from "@/server/memberAction";
import { useQuery } from "@tanstack/react-query";

export const useGetMembers = () => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => getMember(),
    queryKey: ["members"],
  });
};
