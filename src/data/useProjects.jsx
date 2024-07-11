import { getProject, getProjects } from "@/server/projectAction";
import { useQuery } from "@tanstack/react-query";

export const useGetProjects = () => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => getProjects(),
    queryKey: ["projects"],
  });
};

export const useGetProject = (id) => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => getProject(id),
    queryKey: ["project", id],
  });
};
