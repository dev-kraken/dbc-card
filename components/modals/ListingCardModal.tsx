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
import { Loader2, Trash } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { State, states } from "@/constants/states";
import useNumberInput from "@/hooks/useNumberInput";
import Image from "next/image";
import { AddUpdateListing } from "@/action/CardListingAction";
import { ListingDropzone } from "@/components/upload/ListingDropZone";

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
  const [allStates, setAllStates] = useState<State[]>([]);
  const [listingImgSrc, setListingImgSrc] = useState<string[]>([]);
  const { onKeyDown, onPaste } = useNumberInput();

  type formSchema = z.infer<typeof ListingSchema>;
  const form = useForm<formSchema>({
    resolver: zodResolver(ListingSchema),
    defaultValues: {
      listingImages: [] as File[],
      street: "",
      city: "",
      stateId: "",
      zipcode: "",
      propertyType: "",
      parking: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      squareFootage: "",
      lotSize: "",
      yearBuilt: "",
      countryId: "",
      description: "",
    },
  });

  const onSubmit = async (values: formSchema) => {
    const listingData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => {
          listingData.append(`${key}[]`, val);
        });
      } else {
        listingData.append(key, value);
      }
    });
    startTransition(async () => {
      await AddUpdateListing(listingData).then((res) => {
        console.log(res);
      });
    });
  };

  const handelClose = () => {
    form.reset();
    setError(undefined);
    setListingImgSrc([]);
    setAllStates(states);
    onClose();
  };
  const onListingDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      form.setError("listingImages", {
        message: "Please add at least 2 images.",
      });
      return;
    }

    const imageField = form.getValues("listingImages");
    const limitLength =
      imageField.length === 0 ? 0 : imageField.length + acceptedFiles.length;

    for (let i = 0; i < acceptedFiles.length; i++) {
      for (let j = 0; j < imageField.length; j++) {
        if (acceptedFiles[i].name === imageField[j].name) {
          acceptedFiles.splice(i, 1);
          i--;
          break;
        }
      }
    }

    if (acceptedFiles.length > 5 || limitLength > 5) {
      form.setError("listingImages", { message: "Max image limit is 5." });
      return;
    }
    acceptedFiles.forEach((file) => {
      if (!file) return;
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => {
        console.log("file reading has failed");
      };
      reader.onload = () => {
        form.setValue("listingImages", [...imageField, file] as File[]);
        setListingImgSrc((listingImgSrc) => [
          ...listingImgSrc,
          reader.result?.toString() as string,
        ]);
      };
      reader.readAsDataURL(file);
    });
  };
  const handelListingDelete = (index: number) => {
    form.clearErrors("listingImages");
    setListingImgSrc((listingImgSrc) => [
      ...listingImgSrc.slice(0, index),
      ...listingImgSrc.slice(index + 1),
    ]);
    form.setValue("listingImages", [
      ...form.getValues("listingImages").slice(0, index),
    ]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handelClose}>
      <DialogContent className="flex w-full sm:max-w-4xl overflow-hidden flex-col gap-6 border-none px-6 py-9">
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
            <div className="grid grid-cols-5 gap-3">
              {listingImgSrc.length < 5 && (
                <FormField
                  control={form.control}
                  name="listingImages"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem className="col-span-5">
                      <FormControl>
                        <>
                          <ListingDropzone onDrop={onListingDrop} />
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
              <div className="flex flex-1 gap-2 col-span-5">
                {listingImgSrc.map((src, index) => (
                  <div
                    key={index}
                    className="relative group w-[170px] h-fit group"
                  >
                    <Image
                      className="rounded-md overflow-x-auto "
                      src={src}
                      alt={`listingImg${index}`}
                      key={index}
                      width={0}
                      height={0}
                      style={{ width: "100%", height: "auto" }}
                    />
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/70 rounded w-full h-auto opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-300">
                      <Trash
                        className="size-10 text-destructive cursor-pointer p-2 rounded bg-dark-1"
                        onClick={() => handelListingDelete(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
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
                      defaultValue={field.value}
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
                    <FormMessage className="text-xs" />
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
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearBuilt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-zinc-500 dark:text-secondary/70">
                      Year Built
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={4}
                        className="text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="2024"
                        {...field}
                        onKeyDown={onKeyDown}
                        onPaste={onPaste}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="squareFootage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-zinc-500 dark:text-secondary/70">
                      Square Footage
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lotSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-zinc-500 dark:text-secondary/70">
                      Lot Size
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Lot Size"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-zinc-500 dark:text-secondary/70">
                      Bedrooms
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Bedrooms" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="9">9</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="11">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-zinc-500 dark:text-secondary/70">
                      Bathrooms
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Bathrooms" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="7">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-zinc-500 dark:text-secondary/70">
                      Parking
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Lot Size"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="countryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-zinc-500 dark:text-secondary/70">
                      Country
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.resetField("stateId");
                        const filteredStates = states.filter(
                          (state) => state.country === value,
                        );
                        setAllStates(filteredStates);
                      }}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-xs text-zinc-500 dark:text-secondary/70">
                      Street
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter Street"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-zinc-500 dark:text-secondary/70">
                      City
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter City"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stateId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
                      State
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {allStates?.map((state) => (
                          <SelectItem
                            key={state.abbreviation}
                            value={state.abbreviation}
                          >
                            {state.abbreviation}
                          </SelectItem>
                        ))}
                        {allStates.length === 0 && (
                          <SelectItem disabled value="1">
                            Select Country
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-zinc-500 dark:text-secondary/70">
                      Zip Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="10001"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-5">
                    <FormLabel className="text-xs text-zinc-500 dark:text-secondary/70">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a bit about your listing"
                        className="resize-none"
                        {...field}
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
