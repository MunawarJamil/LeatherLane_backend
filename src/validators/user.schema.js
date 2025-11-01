import { z } from "zod";

export const userRegisterSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot exceed 50 characters"),
  email: z
    .string()
    .email("Invalid email format")
    .min(5)
    .max(100),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password cannot exceed 100 characters"),
});

export const userLoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});
