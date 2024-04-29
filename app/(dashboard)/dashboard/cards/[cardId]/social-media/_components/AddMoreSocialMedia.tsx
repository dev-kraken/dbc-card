"use client";
import React from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AddMoreSocialMediaProps {
  socialMediaNetworks: (SocialMediaNetworkT & { value?: string })[] | [];
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
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle>Select Media</CardTitle>
        <CardDescription>What would you like to show in card?</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3 justify-center items-center">
        {socialMediaNetworks.map((socialMedia, index) => {
          return (
            <Button
              key={index}
              variant="default"
              className="w-36 bg-purple-1 gap-2 disabled:pointer-events-auto disabled:cursor-not-allowed"
              disabled={socialMedia.isDisabled}
              onClick={() => addNewInput({ ...socialMedia, isDisabled: true })}
              aria-label={socialMedia.name}
            >
              {getIconComponent(socialMedia.icon, "size-4")}
              <p>{socialMedia.name}</p>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default AddMoreSocialMedia;
