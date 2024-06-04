import * as z from "zod";

enum ImageFormat {
    PNG = "image/png",
    JPEG = "image/jpeg",
    JPG = "image/jpg",
    WEBP = "image/webp",
}

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_TYPES = [
    ImageFormat.PNG,
    ImageFormat.JPEG,
    ImageFormat.JPG,
    ImageFormat.WEBP,
];
export const ListingSchema = z.object({
    listingImages: z
        .array(
            z
                .instanceof(File, {
                    message: "Listing image is required.",
                })
                .refine((file) => {
                    return file && file.size > 0;
                }, "Listing image is required.")
                .refine(
                    (file) => file && file.size <= MAX_FILE_SIZE,
                    `Max image size is 5MB.`,
                )
                .refine(
                    (file) =>
                        file && ACCEPTED_IMAGE_TYPES.includes(file?.type as ImageFormat),
                    `Only ${Object.values(ImageFormat).join(", ")} formats are supported.`,
                ),
        )
        .min(2, "Please add at least 2 images.")
        .max(5, "Max image limit is 5."),
    street: z.string().min(1, {
        message: "Street is required.",
    }),
    city: z.string().min(1, {
        message: "City is required.",
    }),
    stateId: z.string().min(1, {
        message: "State is required",
    }),
    zipcode: z.string().min(1, {
        message: "Zip Code is required",
    }),
    propertyType: z.string().min(1, {
        message: "Property Type is required",
    }),
    price: z.string().min(1, {
        message: "Price is required",
    }),
    parking: z.string().min(1, {
        message: "Parking is required",
    }),
    bedrooms: z.string().min(1, {
        message: "Bedrooms is required",
    }),
    bathrooms: z.string().min(1, {
        message: "Bathrooms is required",
    }),
    squareFootage: z.string().min(1, {
        message: "Square Footage is required",
    }),
    lotSize: z.string().min(1, {
        message: "Lot Size is required",
    }),
    yearBuilt: z.string().min(1, {
        message: "Year Built is required",
    }),
    countryId: z.string().min(1, {
        message: "Country is required",
    }),
    description: z.string().min(0),
    cardId: z.string().optional()
});
