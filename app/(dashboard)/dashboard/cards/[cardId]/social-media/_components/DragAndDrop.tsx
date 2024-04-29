"use client";
import React, { useEffect } from "react";

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
import { Reorder } from "framer-motion";
import AddMoreSocialMedia from "@/app/(dashboard)/dashboard/cards/[cardId]/social-media/_components/AddMoreSocialMedia";
import { z } from "zod";
import { SocialMedia } from "@/zod/CardSchema";
import { Button } from "@/components/ui/button";
import { SocialMediaEntry } from "@/global";
import { BadgePlus, Trash2 } from "lucide-react";
import { AddUpdateCardSocialMedia } from "@/action/SocialMedia";
import { useRouter } from "next/navigation";

interface DragAndDropProps {
  socialMediaNetworks: (SocialMediaNetworkT & { value?: string })[] | [];
  cardSocialMedia: SocialMediaEntry[] | [];
  cardId: string;
}

const DragAndDrop = ({
  socialMediaNetworks,
  cardSocialMedia,
  cardId,
}: DragAndDropProps) => {
  let [newSocialMediaInput, setNewSocialMediaInput] =
    React.useState<SocialMediaNetworkT[]>(socialMediaNetworks);

  let [socialMediaInput, setSocialMediaInput] = React.useState<
    SocialMediaEntry[] | []
  >(cardSocialMedia || []);

  const router = useRouter();
  const form = useForm<z.infer<typeof SocialMedia>>({
    resolver: zodResolver(SocialMedia),
    defaultValues: {
      ...(Array.isArray(socialMediaInput && socialMediaInput)
        ? socialMediaInput.reduce(
            (
              acc: Record<string, string>,
              curr: { name: any; value: string },
            ) => {
              const name = curr?.name || "";
              acc[name] = curr.value || "";
              return acc;
            },
            {},
          )
        : {}),
    },
  });

  const handelButtonDisable = (newInput: SocialMediaNetworkT) => {
    const disable = newSocialMediaInput.map((input) => {
      if (input.name === newInput.name) {
        return newInput;
      }
      return input;
    });
    setNewSocialMediaInput(disable);
  };

  useEffect(() => {
    const labelsToValues = new Map();
    socialMediaInput.forEach((item) => {
      labelsToValues.set(item.name, item.value);
    });
    const updatedDisable = newSocialMediaInput.map((item) => {
      if (labelsToValues.has(item.name)) {
        if (!item.isDisabled) {
          return { ...item, isDisabled: true };
        }
      } else {
        if (item.isDisabled) {
          return { ...item, isDisabled: false };
        }
      }
      return item;
    });

    // Check if the state needs to be updated before setting it
    if (!arraysEqual(updatedDisable, newSocialMediaInput)) {
      setNewSocialMediaInput(updatedDisable);
    }
  }, [newSocialMediaInput, socialMediaInput]);

  // Utility function to compare arrays
  function arraysEqual(a: string | any[] | null, b: string | any[] | null) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  const addNewInput = (input: SocialMediaNetworkT) => {
    handelButtonDisable(input);
    const { id, name } = input;
    setSocialMediaInput([
      ...socialMediaInput,
      { socialNetworkId: id, name, value: "" },
    ]);
  };

  const removeInput = (input: SocialMediaEntry) => {
    form.unregister(input.name as keyof z.infer<typeof SocialMedia>);
    newSocialMediaInput.map((item) => {
      if (item.name === input.name) {
        handelButtonDisable({ ...item, isDisabled: false });
      }
    });
    setSocialMediaInput(socialMediaInput.filter((item) => item !== input));
  };

  function onSubmit(values: z.infer<typeof SocialMedia>) {
    const data = socialMediaInput.map((input, index) => ({
      id: input?.id,
      value: values[input?.name as keyof z.infer<typeof SocialMedia>] || "",
      priority: index + 1,
      cardId: cardId,
      socialNetworkId: input.socialNetworkId || input.id,
    }));

    AddUpdateCardSocialMedia(data).then((r) => {
      if (r?.success) {
        router.prefetch(`/dashboard/cards/${cardId}/social-media`);
      }
    });
  }

  return (
    <main className="grid grid-cols-3 gap-3">
      <Reorder.Group
        className="col-span-2"
        values={socialMediaInput}
        onReorder={setSocialMediaInput}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {socialMediaInput.map((input) => (
              <Reorder.Item
                value={input}
                key={input.id || input.socialNetworkId}
                className="p-3 border border-gray-300 rounded-lg mb-4 bg-white"
              >
                <FormField
                  control={form.control}
                  name={input?.name as keyof z.infer<typeof SocialMedia>}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center mb-4 w-full">
                        <FormLabel>{input?.name}</FormLabel>
                        <Trash2
                          className="size-4 cursor-pointer text-destructive"
                          onClick={() => removeInput(input)}
                        />
                      </div>
                      <FormControl>
                        <Input
                          placeholder={input.value}
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Reorder.Item>
            ))}
            <Button
              type="submit"
              variant="default"
              className="bg-purple-1 w-36 text-white hover:bg-purple-2 gap-1 float-end"
            >
              <BadgePlus className="size-4" />
              Save Media
            </Button>
          </form>
        </Form>
      </Reorder.Group>
      <AddMoreSocialMedia
        socialMediaNetworks={newSocialMediaInput}
        addNewInput={addNewInput}
      />
    </main>
  );
};

export default DragAndDrop;
