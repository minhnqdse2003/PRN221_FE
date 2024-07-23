import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createWorkReport } from "@/server/workReportAction";
export const useCreateWorkReport = (onClose) => {
    const queryClient = useQueryClient();
  
    return useMutation({
        mutationKey: 'createWorkReport',
      mutationFn: async (workReportData) => await createWorkReport(workReportData),
      onSuccess: () => {
        queryClient.invalidateQueries(["workReports"]);
        onClose();
      },
      onError: (error) => {
        console.error("Error creating work report:", error);
      },
    });
  };