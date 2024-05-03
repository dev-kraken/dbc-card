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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { IoAddOutline } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import ModalFormError from "@/components/modals/ModalFormError";
import { ListingSchema } from "@/zod/ListingSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listingPropertyTypes } from "@/constants/ListingHome";
import { Input } from "@/components/ui/input";

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

  type formSchema = z.infer<typeof ListingSchema>;
  const form = useForm({
    resolver: zodResolver(ListingSchema),
    defaultValues: {
      street: "",
      city: "",
      stateId: 0,
      zipcode: "",
      propertyType: 0,
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
      squareFootage: 0,
      lotSize: 0,
      yearBuilt: 0,
      countryId: 0,
      description: "",
    },
  });

  const onSubmit = async (values: formSchema) => {
    setError(undefined);
    startTransition(async () => {
      console.log(values);
    });
  };

  const handelClose = () => {
    form.reset();
    setError(undefined);
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handelClose}>
      <DialogContent className="flex w-full sm:max-w-3xl overflow-hidden flex-col gap-6 border-none px-6 py-9">
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
            <div className="grid grid-cols-6 gap-3">
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-xs text-zinc-500 dark:text-secondary/70">
                      Property Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Property Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {listingPropertyTypes.map((proType, index) => (
                          <SelectItem
                            key={index}
                            value={proType.value.toString()}
                          >
                            {proType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-zinc-500 dark:text-secondary/70">
                      Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="$0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
