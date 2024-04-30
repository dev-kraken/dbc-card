"use server";

import * as z from "zod";
import { SignIn, SignUp } from "@/zod/AuthSchema";
import { createClient } from "@/utils/supabase/server";
import { AuthError } from "@supabase/auth-js";
import { DefaultLoginRedirect } from "@/routes";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const Login = async (values: z.infer<typeof SignIn>) => {
  const supabase = createClient();
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
      console.log(error);
      throw new Error(error.message);
    }
  } catch (error: AuthError | any) {
    return {
      error: error.message,
    };
  }

  redirect(DefaultLoginRedirect);
};

export const Register = async (values: z.infer<typeof SignUp>) => {
  const supabase = createClient();
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
        data: {
          first_name: fName,
          last_name: lName,
        },
        emailRedirectTo: process.env.NEXT_PUBLIC_MAIN_URL,
      },
    });
    if (error) throw new Error(error.message);
    if (data) {
      return {
        success: "Confirm email sent to " + email,
      };
    }
  } catch (error: AuthError | any) {
    return {
      error: error.message,
    };
  }
};

export const SignedInUser = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error);
  }
  return data.user;
};
