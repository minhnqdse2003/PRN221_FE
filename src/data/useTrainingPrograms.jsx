import {
  getTrainingProgram,
  getTrainingPrograms,
} from "@/server/trainingProgramAction";
import { useQuery } from "@tanstack/react-query";

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
