import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
});

export const NewIngredientSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
});

export const NewProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z.string().min(1, { message: "Cost is required" }),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, { message: "Name is required" }),
      amount: z.number().min(1, { message: "Amount is required" }),
    })
  ),
});

export const NewTransactionSchema = z.object({
  products: z.array(
    z.object({
      name: z.string().min(1, { message: "Name is required" }),
      amount: z.number().min(1, { message: "Amount is required" }),
    })
  ),
});
