"use client";
import React from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Reorder } from "framer-motion";
import AddMoreSocialMedia from "@/app/(dashboard)/dashboard/cards/[cardId]/social-media/_components/AddMoreSocialMedia";
import { z } from "zod";
import { SocialMedia } from "@/zod/CardSchema";
import { Button } from "@/components/ui/button";
import { SocialMediaEntry } from "@/global";

interface DragAndDropProps {
  socialMediaNetworks: SocialMediaNetworkT[] | [];
  cardSocialMedia: SocialMediaEntry[] | [];
}

const DragAndDrop = ({
  socialMediaNetworks,
  cardSocialMedia,
}: DragAndDropProps) => {
  const [newSocialMediaInput, setNewSocialMediaInput] =
    React.useState<SocialMediaNetworkT[]>(socialMediaNetworks);

  const [socialMediaInput, setSocialMediaInput] = React.useState<
    SocialMediaEntry[] | []
  >(cardSocialMedia);

  const form = useForm<z.infer<typeof SocialMedia>>({
    resolver: zodResolver(SocialMedia),
    defaultValues: {
      ...socialMediaInput.reduce(
        (acc, curr) => {
          acc[curr?.name || ""] = curr.value || "";
          return acc;
        },
        {} as Record<string, string>,
      ),
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

  const addNewInput = (input: SocialMediaNetworkT) => {
    handelButtonDisable(input);
    const { name } = input;
    setSocialMediaInput([...socialMediaInput, { name, value: "" }]);
  };

  function onSubmit(values: z.infer<typeof SocialMedia>) {
    console.log(values);
  }

  return (
    <main>
      <Reorder.Group values={socialMediaInput} onReorder={setSocialMediaInput}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {socialMediaInput.map((input, index) => (
              <Reorder.Item value={input} key={index}>
                <FormField
                  control={form.control}
                  name={input?.name as keyof z.infer<typeof SocialMedia>}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center mb-4 w-full">
                        <FormLabel>{input?.name}</FormLabel>
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
            <Button type="submit" variant="default" className="w-full">
              Save
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
