import { z } from "zod";

export const FormAuthSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be email account" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export const FormCategorySchema = z.object({
  nameCategory: z
    .string()
    .trim()
    .min(1, { message: "Category name is required" }),
});