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

export const useCreateProject = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectData) => await createProject(projectData),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      onClose();
    },
  });
};

export const useRemoveProject = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId) => await removeProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      onClose();
    },
  });
};

export const useUpdateProject = (onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectData) => await updateProject(projectData.id, projectData),
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectData.id]);
      queryClient.invalidateQueries(["projects"]);
      onClose();
    },
  });
};

export const useGetProjectMembers = (projectId) => {
  return useQuery({
    queryKey: ["projectMembers", projectId],
    queryFn: async () => getProjectMembers(projectId),
    refetchOnWindowFocus: false,
  });
};

export const usePostProjectMemberPosition = (projectId, onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => await postProjectMemberPosition(projectId, userData),
    onSuccess: () => {
      queryClient.invalidateQueries(["projectMembers", projectId]);
      onClose();
    },
  });
};

export const usePutProjectMemberPosition = (projectId, onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => await putProjectMemberPosition(projectId, userData),
    onSuccess: () => {
      queryClient.invalidateQueries(["projectMembers", projectId]);
      onClose();
    },
  });
};

export const useRemoveMemberFromProject = (projectId, onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => await removeMemberFromProject(projectId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["projectMembers", projectId]);
      onClose();
    },
  });
};