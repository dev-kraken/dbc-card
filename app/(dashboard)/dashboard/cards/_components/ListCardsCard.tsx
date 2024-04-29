import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Bolt,
  ExternalLink,
  Heart,
  Link as LinkIcon,
  Pencil,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DeleteCardButton from "@/app/(dashboard)/dashboard/cards/_components/DeleteCardButton";
import Link from "next/link";
import AddUpdateCardModal from "@/app/(dashboard)/dashboard/cards/_components/AddUpdateCardModal";

interface CardProps {
  card: AllCardsListT;
  imageUrl: string;
}

const ListCardsCard = ({ card, imageUrl }: CardProps) => {
  return (
    <Card className="w-full sm:w-full md:w-[25rem] border-purple-4/50">
      <CardHeader className="p-2 border-b flex">
        <TooltipProvider>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <AddUpdateCardModal
                    variant="ghost"
                    size="icon"
                    mode="update"
                    cardData={card}
                  >
                    <Pencil className="size-4" />
                  </AddUpdateCardModal>
                  <span className="sr-only">Copy Link</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Rename Card</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <LinkIcon className="size-4" />
                  <span className="sr-only">Copy Link</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy Link</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Heart className="size-4" />
                  <span className="sr-only">Favorite</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Favorite</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Tooltip>
              <TooltipTrigger asChild aria-controls="delete-card:popover">
                <div>
                  <DeleteCardButton
                    cardName={card.cardName}
                    cardId={card.cardId}
                  />
                  <span className="sr-only">Delete Card</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Delete Card</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <div className="flex items-center space-x-2 ml-auto">
              <Label
                htmlFor="active-mode"
                className="text-xs font-medium text-emerald-500"
              >
                Active
              </Label>
              <Switch
                id="active-mode"
                checked={true}
                className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-destructive"
              />
            </div>
          </div>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="py-4 gap-2 flex items-center justify-between">
        <Avatar className="size-20">
          <AvatarImage src={imageUrl} alt={card.cardName} />
          <AvatarFallback>
            {card.cardName
              .split(" ")
              .map((chunk) => chunk[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold truncate">{card.cardName}</h3>
      </CardContent>
      <CardFooter className="flex justify-between p-4 items-center">
        <Button
          variant="secondary"
          size="sm"
          className="w-[48%] gap-1 border-purple-1 border text-purple-1"
        >
          <ExternalLink className="size-4" />
          Preview
        </Button>
        <Button
          variant="default"
          size="sm"
          className="w-[48%] bg-purple-1 hover:bg-purple-3 gap-1"
          asChild
        >
          <Link href={`/dashboard/cards/${card.cardId}/select-style`}>
            <Bolt className="size-4" />
            Edit
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ListCardsCard;
