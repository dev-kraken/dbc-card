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

export const DBCardProfileSchema = z.object({
  cardId: z.string(),
  profileName: z.string().min(1, {
    message: "Card name is required.",
  }),
  cardProfileImg: z
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
  licenseNumber: z.string().min(1, {
    message: "License number is required.",
  }),
  subHeader: z.string().min(1, {
    message: "Sub header is required.",
  }),
  bio: z.string().min(1, {
    message: "Bio is required.",
  }),
});

export const SocialMedia = z.record(
  z.string({
    errorMap: (issue) => ({
      message: `${issue.path} is required.`,
    }),
  }),
);

export const SocialMediaBackend = z.array(
  z.object({
    id: z.number().min(1, {
      message: "Id is required.",
    }),
    value: z.string().min(4, {
      message: "Value is required.",
    }),
    priority: z.number().min(1, {
      message: "Priority is required.",
    }),
    cardId: z.string().min(5, {
      message: "Card id is required.",
    }),
    socialNetworkId: z.number().min(1, {
      message: "Social network id is required.",
    }),
  }),
);
