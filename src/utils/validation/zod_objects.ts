import { z } from "zod";

export const FormAuthSchema = z.object({
  email: z.string().trim().min(1, { message: "Email is required" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

/* const FormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Ingrese el email" }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
}); */
