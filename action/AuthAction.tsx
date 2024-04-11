"use server";

import * as z from "zod";
import { SignIn, SignUp } from "@/zod/AuthSchema";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AuthError } from "@supabase/auth-js";

const supabase = createClient();
export const Login = async (values: z.infer<typeof SignIn>) => {
  const validatedFields = SignIn.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password } = validatedFields.data;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
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

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "http://localhost:3000",
      },
    });
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      return {
        success: "Email sended"
      }
    }
  } catch (error: AuthError | any) {
    return {
      error: error.message,
    };
  }
};

export const LogOut = async () => {
  const { error } = await supabase.auth.signOut()
}