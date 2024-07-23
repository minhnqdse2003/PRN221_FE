import { z } from "zod";

export const addMemberSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  gpa: z
    .string()
    .min(0, "GPA must be at least 0")
    .max(4, "GPA must be at most 4"),
  address: z.string().nonempty("Address is required"),
  phone: z
    .string()
    .nonempty("Phone is required")
    .regex(/^\+?[0-9]\d{1,9}$/, "Invalid phone number format"),
  major: z.string().nonempty("Major is required"),
  "desired-position": z.string().nonempty("Desired position is required"),
  "link-cv": z.string().url("Invalid URL format"),
  gender: z.boolean(),
  status: z.boolean(),
  role: z.enum(["Manager", "Intern", "Mentor"], "Invalid role"),
});
