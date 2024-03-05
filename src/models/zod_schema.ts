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
  name: z.string().trim().min(1, { message: "Category name is required" }),
});

export const FormSupplierSchema = z.object({
  name: z.string().trim().min(1, { message: "Supplier name is required" }),
  address: z
    .string()
    .trim()
    .min(1, { message: "Supplier address is required" }),
  phone: z.string().trim().min(1, { message: "Supplier phone is required" }),
  email: z.string().trim().min(1, { message: "Supplier email is required" }),
});

export const FormProductSchema = z.object({
  categoryId: z
    .string({ invalid_type_error: "Category is required" })
    .trim()
    .min(1, { message: "Category is required" }),
  name: z.string().trim().min(1, { message: "Product name is required" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Product description is required" }),
});
