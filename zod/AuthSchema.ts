import * as z from "zod";

export const SignIn = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

export const SignUp = z
  .object({
    fName: z.string().min(2, "First Name is required"),
    lName: z.string().min(2, "Last Name is required"),
    email: z.string().email("Email is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
