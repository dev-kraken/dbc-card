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

interface CardProps {
  card: AllCardsListT;
}

const ListCardsCard = ({ card }: CardProps) => {
  return (
    <Card className="w-full sm:w-full md:w-[25rem] border-purple-4/50">
      <CardHeader className="p-2 border-b flex">
        <TooltipProvider>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Pencil className="size-4" />
                  <span className="sr-only">Rename Card</span>
                </Button>
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
              <TooltipTrigger asChild>
                <div>
                  <DeleteCardButton
                    cardName={card.cardName}
                    cardId={card.cardId ?? ""}
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
      <CardContent className="py-4 flex items-center justify-between">
        <Avatar className="size-20">
          <AvatarImage
            src={`http://127.0.0.1:54321/storage/v1/object/public/AvatarCards/${card.avatarUrl}`}
            alt={card.cardName}
          />
          <AvatarFallback>
            {card.cardName
              .split(" ")
              .map((chunk) => chunk[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-2xl font-semibold">{card.cardName}</h3>
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
