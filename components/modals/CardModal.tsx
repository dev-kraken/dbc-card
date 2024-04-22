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
import { Loader2, Trash } from "lucide-react";
import { AddUpdateCard, getAvatarUrl } from "@/action/CardCURD";
import ModalFormError from "@/components/modals/ModalFormError";
import { useToast } from "@/components/ui/use-toast";

const UrlToFile = async (url: string, name: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], name, { type: "image/png" });
};

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  cardData?: AllCardsListT;
  mode: string;
}

const CardModal = ({
  isOpen,
  onClose,
  title,
  buttonText,
  cardData,
  mode,
}: CardModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [modalState, setModalState] = useState<"cropAvatar" | undefined>(
    undefined,
  );
  const [imgSrc, setImgSrc] = useState("");
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(DBCardSchema),
    defaultValues: {
      cardName: "",
      cardAvatarImg: new File([], ""),
    },
  });

  const onSubmit = async (values: z.infer<typeof DBCardSchema>) => {
    setError(undefined);
    const cardValues = new FormData();
    cardValues.append("cardName", values.cardName);
    cardValues.append("cardAvatarImg", values.cardAvatarImg as File);
    startTransition(async () => {
      try {
        await AddUpdateCard(cardValues, mode, cardData?.id as number).then(
          (res) => {
            setError(res?.error);
            if (res?.success) {
              toast({
                variant: "default",
                className:
                  "emerald-500 group border-emerald-500 bg-emerald-500/15 text-emerald-500",
                duration: 3000,
                title:
                  res?.success || mode === "update"
                    ? "Card Updated successfully"
                    : "Card added successfully!",
              });
              handelClose();
            }
          },
        );
      } catch (error) {
        setError(error as string);
      }
    });
  };

  useEffect(() => {
    const fetchImageFile = async () => {
      if (isOpen && cardData) {
        form.setValue("cardName", cardData.cardName);
        try {
          const avatarUrl = await getAvatarUrl(cardData.avatarUrl);
          const file = await UrlToFile(`${avatarUrl}`, cardData.avatarUrl);
          form.setValue("cardAvatarImg", file);
          setImgFile(file);
          setImgSrc(avatarUrl);
        } catch (error) {
          console.error("Error fetching image file:", error);
        }
      }
    };

    fetchImageFile().finally();
  }, [cardData, form, isOpen]);

  useEffect(() => {
    if (!imgFile) {
      setImgSrc("");
      setModalState(undefined);
      setImgFile(undefined);
      return;
    }
    if (imgFile) {
      form.setValue("cardAvatarImg", imgFile);
      form.clearErrors("cardAvatarImg");
      setImgSrc(URL.createObjectURL(imgFile));
    }
  }, [cardData, form, imgFile]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file && acceptedFiles.length === 0)
      form.setError("cardAvatarImg", { message: "required" });

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
    setError(undefined);
    setImgSrc("");
    setImgFile(undefined);
    form.setValue("cardAvatarImg", new File([], ""));
  };

  const handelClose = () => {
    form.reset();
    setError(undefined);
    setModalState(undefined);
    setImgFile(undefined);
    setImgSrc("");
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handelClose}>
      <DialogContent className="flex w-full max-w-[450px] flex-col gap-6 border-none px-6 py-9">
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
                  name="cardAvatarImg"
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
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-zinc-500 dark:text-secondary/70">
                      Card Name
                    </FormLabel>
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
            </div>
            <ModalFormError message={error} />
            <DialogFooter>
              <Button
                disabled={isPending}
                type="submit"
                variant="default"
                className="flex items-center gap-1 bg-purple-1 hover:bg-purple-2 w-36"
                size="sm"
              >
                {!isPending && <IoAddOutline size={18} />}
                {!isPending && <span>{buttonText}</span>}
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
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
