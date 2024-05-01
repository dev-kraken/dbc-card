"use client";
import React, { useState, useTransition } from "react";
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
import { Loader2 } from "lucide-react";
import { AddUpdateCard } from "@/action/CardCURD";
import ModalFormError from "@/components/modals/ModalFormError";
import { useToast } from "@/components/ui/use-toast";

interface ListingCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
  cardData?: AllCardsListT;
  mode: string;
}

const ListingCardModal = ({
  isOpen,
  onClose,
  title,
  buttonText,
  cardData,
  mode,
}: ListingCardModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
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

  const handelClose = () => {
    form.reset();
    setError(undefined);
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handelClose}>
      <DialogContent className="flex w-full sm:max-w-3xl overflow-hidden w-7/12' flex-col gap-6 border-none px-6 py-9">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-dark-1 text-center w-96 mx-auto">
            Add listing information below given the inputs.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
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
      </DialogContent>
    </Dialog>
  );
};

export default ListingCardModal;
