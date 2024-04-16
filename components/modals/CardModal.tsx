"use client";
import React, { useEffect, useState, useTransition } from "react";
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
import CardAvatarCrop from "@/components/modals/CardAvatarCrop";
import Image from "next/image";
import { Trash } from "lucide-react";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
}

const CardModal = ({ isOpen, onClose, title, buttonText }: CardModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [modalState, setModalState] = useState<"cropAvatar" | undefined>(
    undefined,
  );
  const [imgSrc, setImgSrc] = useState("");
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const form = useForm({
    resolver: zodResolver(DBCardSchema),
    defaultValues: {
      name: "",
      cardProfile: new File([], "") || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof DBCardSchema>) => {
    startTransition(async () => {
      console.log(values);
    });
  };

  useEffect(() => {
    if (!imgFile) {
      form.setError("cardProfile", { message: "Card profile is required" });
      setImgSrc("");
      setModalState(undefined);
      setImgFile(undefined);
      return;
    }
    if (imgFile) {
      form.setValue("cardProfile", imgFile);
      form.clearErrors("cardProfile");
      setImgSrc(URL.createObjectURL(imgFile));
    }
  }, [form, imgFile]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file && acceptedFiles.length === 0)
      form.setError("cardProfile", { message: "required" });

    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => {
      setModalState(undefined);
      console.log("file reading has failed");
    };
    reader.onload = () => {
      setImgSrc(reader.result?.toString() || "");
      setModalState("cropAvatar");
    };
    reader.readAsDataURL(file);
  };

  const handelDelete = () => {
    setImgSrc("");
    setImgFile(undefined);
    form.setValue("cardProfile", new File([], ""));
  };

  const handelClose = () => {
    form.reset();
    setModalState(undefined);
    setImgFile(undefined);
    setImgSrc("");
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
              {imgFile && imgSrc ? (
                <div className="relative group w-[150px] h-auto group mx-auto">
                  <Image
                    src={imgSrc}
                    alt={imgFile.name}
                    width={0}
                    height={0}
                    style={{ width: "150px", height: "auto" }}
                    className="rounded-full mx-auto border-2 border-purple-4 relative w-[150px] h-auto"
                  />
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/50 rounded-full w-[150px] h-auto opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-300">
                    <Trash
                      className="size-10 text-destructive cursor-pointer hover:animate-ping p-2 rounded-full bg-dark-1"
                      onClick={handelDelete}
                    />
                  </div>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="cardProfile"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <AvatarDropzone onDrop={onDrop} />
                          <Input
                            disabled={isPending}
                            type="file"
                            className="hidden"
                            {...rest}
                          />
                        </>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              )}
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
        <CardAvatarCrop
          isOpen={modalState === "cropAvatar"}
          onClose={() => setModalState(undefined)}
          imgSrc={imgSrc}
          setImgFile={setImgFile}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
