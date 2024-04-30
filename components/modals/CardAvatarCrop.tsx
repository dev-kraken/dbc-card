"use client";
import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import ReactCrop, { Crop, makeAspectCrop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useDebounceEffect } from "@/components/modals/DebounceEffect";
import { canvasPreview } from "@/components/modals/CanvasPreview";
import { MdPhotoSizeSelectLarge } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

// Type for the props
interface CardAvatarCropProps {
  isOpen: boolean;
  onClose: () => void;
  imgSrc: string;
  setImgFile: Dispatch<SetStateAction<File | undefined>>;
}

// Utility function to calculate center aspect crop
const centerAspectCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
): Crop => {
  return makeAspectCrop(
    {
      unit: "%",
      width: 90,
    },
    aspect,
    mediaWidth,
    mediaHeight,
  );
};

// Component definition
const CardAvatarCrop: React.FC<CardAvatarCropProps> = ({
  isOpen,
  onClose,
  imgSrc,
  setImgFile,
}) => {
  // Refs
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop | undefined>(undefined);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | undefined>(
    undefined,
  );
  const [scale, setScale] = useState<number>(1);
  const [rotate, setRotate] = useState<number>(0);
  const [aspect, setAspect] = useState<number | undefined>(1);

  // Function to handle image load
  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>): void => {
    setAspect(1);
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  // Effect for debouncing crop preview
  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        await canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        );
      }
    },
    100,
    [completedCrop, scale, rotate],
  );

  // Function to set cropped file
  const setCropFile = async (): Promise<void> => {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    // Calculate scale
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Create offscreen canvas
    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    // Draw image on offscreen canvas
    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );

    // Convert canvas to blob
    const blob = await offscreen.convertToBlob({ type: "image/png" });

    // Set image file
    setImgFile(
      new File([blob as Blob], `${uuidv4()}.png`, { type: "image/png" }),
    );

    // Close modal
    onClose();
  };

  const onCloseModal = () => {
    onClose();
    setImgFile(undefined);
    setCrop(undefined);
    setCompletedCrop(undefined);
  };

  // JSX
  return (
    <Dialog open={isOpen} onOpenChange={onCloseModal}>
      <DialogContent className="flex w-full max-w-[420px] flex-col gap-4 border-none px-6 py-9">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Add Avatar
          </DialogTitle>
          <DialogDescription className="text-dark-1 text-center w-96 mx-auto">
            Set the avatar size and position.
          </DialogDescription>
        </DialogHeader>
        {!!completedCrop && (
          <div className="flex justify-center rounded-full">
            <canvas
              className="rounded-full border border-dark-2 shadow"
              ref={previewCanvasRef}
              style={{ objectFit: "contain", width: 150, height: 150 }}
            />
          </div>
        )}
        {!!imgSrc && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            minWidth={150}
            minHeight={150}
            keepSelection
            circularCrop
          >
            <Image
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              width={0}
              height={0}
              style={{
                width: "100%",
                height: "auto",
                transform: `scale(${scale}) rotate(${rotate}deg)`,
              }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        )}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <span className="text-xs">Zoom</span>
            <Slider
              disabled={!imgSrc}
              min={1}
              max={3}
              step={0.1}
              value={[scale]}
              onValueChange={(value) => setScale(value[0])}
            />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs">Rotate</span>
            <Slider
              disabled={!imgSrc}
              min={0}
              max={90}
              value={[rotate]}
              onValueChange={(value) =>
                setRotate(Math.min(180, Math.max(Number(value[0]))))
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={!imgSrc}
            type="submit"
            variant="default"
            className="flex items-center gap-x-1.5 bg-purple-1 hover:bg-purple-2"
            size="sm"
            onClick={setCropFile}
          >
            <MdPhotoSizeSelectLarge className="size-5 text-white" />
            Set Avatar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardAvatarCrop;
