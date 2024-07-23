import { z } from "zod";

export const addTrainingProgramSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  description: z.string().min(1, "Description cannot be empty"),
  duration: z.string().min(1, "Duration must be > 30min"),
  level: z.enum(["Easy", "Medium", "Hard"], "Invalid level"),
});
