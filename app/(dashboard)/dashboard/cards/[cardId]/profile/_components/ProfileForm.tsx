"use client";
import React, { useEffect, useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import { Loader2, Trash } from "lucide-react";
import { AvatarDropzone } from "@/components/upload/AvatarDropZone";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoAddOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DBCardProfileSchema } from "@/zod/CardSchema";
import * as z from "zod";
import CardAvatarCrop from "@/components/modals/CardAvatarCrop";
import { Textarea } from "@/components/ui/textarea";

const ProfileForm = () => {
  const [modalState, setModalState] = useState<"cropAvatar" | undefined>(
    undefined,
  );
  const [isPending, startTransition] = useTransition();
  const [imgSrc, setImgSrc] = useState("");
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);

  const form = useForm({
    resolver: zodResolver(DBCardProfileSchema),
    defaultValues: {
      profileName: "",
      cardProfileImg: new File([], ""),
      licenseNumber: "",
      subHeader: "",
      bio: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof DBCardProfileSchema>) => {
    const cardValues = new FormData();
    cardValues.append("profileName", values.profileName);
    cardValues.append("cardProfileImg", values.cardProfileImg as File);
    startTransition(async () => {
      console.log(values);
    });
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file && acceptedFiles.length === 0)
      form.setError("cardProfileImg", { message: "required" });

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

  useEffect(() => {
    if (!imgFile) {
      setImgSrc("");
      setModalState(undefined);
      setImgFile(undefined);
      return;
    }cardAvatarImg
    if (imgFile) {
      form.setValue("cardProfileImg", imgFile);
      form.clearErrors("cardProfileImg");
      setImgSrc(URL.createObjectURL(imgFile));
    }
  }, [form, imgFile]);

  const handelDelete = () => {
    setImgSrc("");
    setImgFile(undefined);
    form.setValue("cardProfileImg", new File([], ""));
  };
  return (
    <Card className="w-full sm:w-9/12 md:w-9/12 lg:w-7/12 xl:w-6/12 mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Card Profile</CardTitle>
        <CardDescription className="text-xs">
          Update your profile details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
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
                  name="cardProfileImg"
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
                name="profileName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="border-purple-300 text-black focus-visible:border-purple-500 focus-visible:ring-purple-400/50 "
                        placeholder="Enter card name"
                        {...field}
                        maxLength={30}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="XX-0000-XX"
                        type="text"
                        className="focus-visible:border-teal-500 focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subHeader"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Slogan</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Real Estate Agent or Real Estate Broker"
                        type="text"
                        className="focus-visible:border-teal-500 focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
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
                className="flex items-center gap-1 bg-purple-1 hover:bg-purple-2 w-36"
                size="sm"
              >
                {!isPending && <IoAddOutline size={18} />}
                {!isPending && <span>Save Profile</span>}
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
