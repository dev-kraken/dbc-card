"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Trash2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  deleteCard: z
    .string()
    .min(2, { message: "Field is required" })
    .max(6)
    .refine((value) => value === "delete", {
      message: "Please type correct word",
    }),
});

const DeleteCardButton = ({ cardName }: { cardName: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deleteCard: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="size-4 text-destructive" />
          <span className="sr-only">Delete Card</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Are you sure?</h4>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="deleteCard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      Card Name:{" "}
                      <span className="text-lg text-red-500 font-semibold">
                        {cardName ?? ""}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="type delete..." {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Please type <strong>delete</strong> to confirm.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="destructive">
                Delete
              </Button>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DeleteCardButton;
