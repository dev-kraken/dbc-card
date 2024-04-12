import * as z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const DBCardSchema = z.object({
  name: z.string().min(1, {
    message: "Card name is required.",
  }),
  cardProfile: z
    .any()
    .refine((files) => files?.[0], "Card Profile is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});
