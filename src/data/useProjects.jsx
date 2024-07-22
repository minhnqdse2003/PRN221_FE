import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postProjectMemberPosition, updateProject, getProject, getProjects, createProject, removeMemberFromProject, removeProject } from "@/server/projectAction";

export const useGetProjects = () => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => await getProjects(),
    queryKey: ["projects"],
  });
};

export const useGetProject = (id) => {
  return useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => await getProject(id),
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
    onError: (error) => {
      console.error("Error creating project:", error);
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
    onError: (error) => {
      console.error("Error removing project:", error);
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
    onError: (error) => {
      console.error("Error updating project:", error);
    },
  });
};

export const useGetProjectMembers = (projectId) => {
  return useQuery({
    queryKey: ["projectMembers", projectId],
    queryFn: async () => getProjectMembers(projectId),
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("Error fetching project members:", error);
    },
  });
};

export const usePostProjectMemberPosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "postProjectMemberPosition",
    mutationFn: async ({ projectId, userData }) => await postProjectMemberPosition(projectId, userData),
    onSuccess: () => {
      queryClient.invalidateQueries(["projectMembers", projectId]);
    },
    onError: (error) => {
      console.error("Error adding project member:", error);
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
    onError: (error) => {
      console.error("Error updating project member position:", error);
    },
  });
};

export const useRemoveMemberFromProject = (projectId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "removeMemberFromProject",
    mutationFn: async (userId) => await removeMemberFromProject(projectId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["projectMembers", projectId]);
    },
    onError: (error) => {
      console.error("Error removing project member:", error);
    },
  });
};
