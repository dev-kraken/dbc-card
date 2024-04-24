"use client";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Reorder } from "framer-motion";
import AddMoreSocialMedia from "@/app/(dashboard)/dashboard/cards/[cardId]/social-media/_components/AddMoreSocialMedia";

interface DragAndDropProps {
  socialMediaNetworks: SocialMediaNetworkT[] | [];
}

const DragAndDrop = ({ socialMediaNetworks }: DragAndDropProps) => {
  const [newSocialMediaInput, setNewSocialMediaInput] =
    React.useState<SocialMediaNetworkT[]>(socialMediaNetworks);
  const [socialMediaInput, setSocialMediaInput] = React.useState<
    SocialMediaNetworkT[] | []
  >([]);

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
    setSocialMediaInput([...socialMediaInput, input]);
  };
  return (
    <main>
      <Reorder.Group values={socialMediaInput} onReorder={setSocialMediaInput}>
        {socialMediaInput.map((input, index) => (
          <Reorder.Item value={input} key={index}>
            <Card className="m-8">
              <CardHeader>
                <CardTitle>{input.name}</CardTitle>
              </CardHeader>
            </Card>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <AddMoreSocialMedia
        socialMediaNetworks={newSocialMediaInput}
        addNewInput={addNewInput}
      />
    </main>
  );
};

export default DragAndDrop;
