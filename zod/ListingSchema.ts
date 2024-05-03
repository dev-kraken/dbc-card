import * as z from "zod";

export const ListingSchema = z.object({
  street: z.string().min(1, {
    message: "Street is required.",
  }),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  stateId: z.number().min(1, {
    message: "State is required",
  }),
  zipcode: z.string().min(1, {
    message: "Zip Code is required",
  }),
  propertyType: z.number().min(1, {
    message: "Property Type is required",
  }),
  price: z.number().positive().min(1, {
    message: "Price is required",
  }),
  bedrooms: z.number().min(1, {
    message: "Bedrooms is required",
  }),
  bathrooms: z.number().min(1, {
    message: "Bathrooms is required",
  }),
  squareFootage: z.number().positive().min(1, {
    message: "Square Footage is required",
  }),
  lotSize: z.number().positive().min(1, {
    message: "Lot Size is required",
  }),
  yearBuilt: z.number().min(1, {
    message: "Year Built is required",
  }),
  countryId: z.number().min(1, {
    message: "Country is required",
  }),
  description: z.string().min(0),
});
