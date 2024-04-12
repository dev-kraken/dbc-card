"use client";
import React, { useTransition } from "react";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { IoAddOutline } from "react-icons/io5";
import { DBCardSchema } from "@/zod/CardSchema";
import { AvatarDropzone } from "@/components/upload/AvatarDropZone";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  handelClick: () => void;
}

const CardModal = ({
  isOpen,
  onClose,
  title,
  buttonText,
  handelClick,
}: CardModalProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(DBCardSchema),
    defaultValues: {
      name: "",
      cardProfile: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof DBCardSchema>) => {
    startTransition(async () => {
      console.log(values);
    });
  };

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => {
        console.log("file reading has failed");
      };
      reader.onload = () => {
        form.setValue("cardProfile", [file] as unknown as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handelClose = () => {
    form.reset();
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handelClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none px-6 py-9">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-dark-1 text-center w-96 mx-auto">
            Give your card a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="cardProfile"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        {<AvatarDropzone onDrop={onDrop} />}
                        <Input
                          disabled={isPending}
                          type="file"
                          className="hidden"
                          {...rest}
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-zinc-500 dark:text-secondary/70">
                      Card Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="border-purple-300 text-black focus-visible:border-purple-500 focus-visible:ring-purple-400/50"
                        placeholder="Enter card name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                disabled={isPending}
                type="submit"
                variant="default"
                className="flex items-center gap-1 bg-purple-1 hover:bg-purple-2"
                size="sm"
              >
                {!isPending && <IoAddOutline size={18} />}
                {!isPending && <span>{buttonText}</span>}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
