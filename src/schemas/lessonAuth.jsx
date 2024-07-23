const { z } = require("zod");

export const addLessonSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  description: z.string().min(1, "Description cannot be empty"),
  url: z.string().url("Invalid URL format"),
  resource: z.string().url("Invalid URL format"),
});
