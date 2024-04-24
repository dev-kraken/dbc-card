"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaSkype,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { BiLogoGmail, BiLogoTelegram } from "react-icons/bi";
import { BsPhoneFill } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import { SiZillow } from "react-icons/si";
import { PopoverClose } from "@radix-ui/react-popover";

interface AddMoreSocialMediaProps {
  socialMediaNetworks: SocialMediaNetworkT[];
  addNewInput: (input: SocialMediaNetworkT) => void;
}

const getIconComponent = (iconName: string, className: string) => {
  switch (iconName) {
    case "Facebook":
      return <FaFacebookF className={className} />;
    case "Instagram":
      return <FaInstagram className={className} />;
    case "Linkedin":
      return <FaLinkedinIn className={className} />;
    case "Email":
      return <BiLogoGmail className={className} />;
    case "X":
      return <FaXTwitter className={className} />;
    case "Phone":
      return <BsPhoneFill className={className} />;
    case "Website":
      return <AiOutlineGlobal className={className} />;
    case "Zillow":
      return <SiZillow className={className} />;
    case "WhatsApp":
      return <FaWhatsapp className={className} />;
    case "Telegram":
      return <BiLogoTelegram className={className} />;
    case "TikTok":
      return <FaTiktok className={className} />;
    case "YouTube":
      return <FaYoutube className={className} />;
    case "Skype":
      return <FaSkype className={className} />;
    default:
      return null;
  }
};
const AddMoreSocialMedia = ({
  socialMediaNetworks,
  addNewInput,
}: AddMoreSocialMediaProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" className="mx-auto w-full">
          Open popover
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[700px] max-w-[700px]">
        <PopoverClose className="flex flex-wrap gap-3 items-center justify-between border-purple-4">
          {socialMediaNetworks?.map((socialMedia, index) => (
            <Button
              key={index}
              variant="default"
              className="w-36 bg-purple-1 gap-2 disabled:pointer-events-auto disabled:cursor-not-allowed"
              disabled={socialMedia.isDisabled}
              onClick={() => addNewInput({ ...socialMedia, isDisabled: true })}
            >
              {getIconComponent(socialMedia.icon, "size-4")}
              {socialMedia.name}
            </Button>
          ))}
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default AddMoreSocialMedia;
