import * as z from "zod";

enum ImageFormat {
  PNG = "image/png",
  // JPEG = "image/jpeg",
  // JPG = "image/jpg",
  // WEBP = "image/webp",
}

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_TYPES = [ImageFormat.PNG];
export const DBCardSchema = z.object({
  cardName: z.string().min(1, {
    message: "Card name is required.",
  }),
  cardAvatarImg: z
    .instanceof(File, {
      message: "Card profile is required.",
    })
    .refine((file) => {
      return file && file.size > 0;
    }, "Card profile is required.")
    .refine(
      (file) => file && file.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`,
    )
    .refine(
      (file) =>
        file && ACCEPTED_IMAGE_TYPES.includes(file?.type as ImageFormat),
      `Only ${Object.values(ImageFormat).join(", ")} formats are supported.`,
    ),
});
