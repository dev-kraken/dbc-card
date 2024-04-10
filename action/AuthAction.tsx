"use server";

import * as z from "zod";
import { SignIn, SignUp } from "@/zod/AuthSchema";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AuthError } from "@supabase/auth-js";

export const Login = async (values: z.infer<typeof SignIn>) => {
  const validatedFields = SignIn.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password } = validatedFields.data;

  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.log(error);
      throw new Error(error.message);
    }

    if (data) {
      return { success: true };
    }
  } catch (error: AuthError | any) {
    return {
      error: error.message,
    };
  }
};

export const Register = async (values: z.infer<typeof SignUp>) => {
  const validatedFields = SignUp.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { fName, lName, email, password } = validatedFields.data;

  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "http://localhost:3000",
      },
    });
    if (error) {
      throw new Error(error.name);
    }
    if (data) {
      redirect("/");
    }
  } catch (error) {
    return {
      error: "Invalid credentials !",
    };
  }
};
