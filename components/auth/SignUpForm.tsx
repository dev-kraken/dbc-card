"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { SignUp } from "@/zod/AuthSchema";
import AuthCardWrapper from "@/components/auth/AuthCardWrapper";
import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import AuthFormError from "@/components/auth/AuthFormError";
import AuthFormSuccess from "@/components/auth/AuthFormSuccess";
import { Register } from "@/action/AuthAction";

const SignUpForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const supabase = createClient();
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  const form = useForm<z.infer<typeof SignUp>>({
    resolver: zodResolver(SignUp),
    defaultValues: {
      fName: "",
      lName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignUp>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      Register(values).then((data) => {
        setError(data?.error);
        setSuccess("Account created successfully !");
      });
    });
  };
  return (
    <AuthCardWrapper
      headerLabel="Create an account"
      label="Let's get started with your account."
      backButtonLabel="Already have an account?"
      backButtonTitle="Sign in"
      onBackButtonClick="/sign-in"
      showSocialLogin
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="fName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="First Name"
                          className="pl-8 focus-visible:border-slate-500 focus-visible:ring-transparent"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Last Name"
                          className="pl-8 focus-visible:border-slate-500 focus-visible:ring-transparent"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Email"
                        type="email"
                        autoComplete="off"
                        className="h-10 focus-visible:border-slate-500 focus-visible:ring-transparent pl-8"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <LockKeyhole className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="off"
                        className="h-10 focus-visible:border-slate-500 focus-visible:ring-transparent pl-8"
                      />
                      {showPassword && (
                        <Eye
                          onClick={showPasswordHandler}
                          className="absolute right-2 top-3 h-4 w-4 text-muted-foreground cursor-pointer"
                        />
                      )}
                      {!showPassword && (
                        <EyeOff
                          onClick={showPasswordHandler}
                          className="absolute right-2 top-3 h-4 w-4 text-muted-foreground cursor-pointer"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <LockKeyhole className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        className="h-10 focus-visible:border-slate-500 focus-visible:ring-transparent pl-8"
                      />
                      {showPassword && (
                        <Eye
                          onClick={showPasswordHandler}
                          className="absolute right-2 top-3 h-4 w-4 text-muted-foreground cursor-pointer"
                        />
                      )}
                      {!showPassword && (
                        <EyeOff
                          onClick={showPasswordHandler}
                          className="absolute right-2 top-3 h-4 w-4 text-muted-foreground cursor-pointer"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <AuthFormError message={error} />
          <AuthFormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {!isPending && "Create an account"}
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  );
};

export default SignUpForm;
