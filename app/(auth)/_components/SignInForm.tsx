"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import AuthCardWrapper from "@/app/(auth)/_components/AuthCardWrapper";

import { SignIn } from "@/zod/AuthSchema";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

import { Login } from "@/action/AuthAction";
import AuthFormError from "@/app/(auth)/_components/AuthFormError";

const SignInForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof SignIn>>({
    resolver: zodResolver(SignIn),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (values: z.infer<typeof SignIn>) => {
    setError("");
    startTransition(() => {
      Login(values).then((data) => {
        setError(data?.error);
      });
    });
  };
  return (
    <AuthCardWrapper
      headerLabel="Sign in to your account"
      label="Welcome back! Select method to sign in."
      backButtonLabel="Don't have an account?"
      backButtonTitle="Sign Up"
      onBackButtonClick="/sign-up"
      showSocialLogin
      isPending={isPending}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
                        autoComplete="email"
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
                        className="h-10 focus-visible:border-slate-500 focus-visible:ring-transparent pl-8 pr-8"
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
            <div className="flex flex-row items-center justify-between">
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        disabled={isPending}
                        className="w-4 h-4"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-xs">Remember Me</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-300 hover:text-decoration-none hover:no-underline text-xs"
                size="sm"
                asChild
              >
                <Link href="#">Forgot Password?</Link>
              </Button>
            </div>
          </div>
          <AuthFormError message={error} />
          <Button disabled={isPending} type="submit" className="w-full">
            {!isPending && "Sign In"}
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  );
};
export default SignInForm;
