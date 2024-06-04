"use server";

import {createClient} from "@/utils/supabase/server";
import {ListingSchema} from "@/zod/ListingSchema";
import {z} from "zod";

export const AddUpdateListing = async (formData: FormData, id?: number) => {
    const supabase = createClient();
    const listingValues = {
        street: formData.get("street") as string,
        city: formData.get("city") as string,
        stateId: formData.get("stateId") as string,
        zipcode: formData.get("zipcode") as string,
        listingImages: formData.getAll('listingImages[]') as File[],
        propertyType: formData.get("propertyType") as string,
        price: formData.get("price") as string,
        parking: formData.get("parking") as string,
        bedrooms: formData.get("bedrooms") as string,
        bathrooms: formData.get("bathrooms") as string,
        squareFootage: formData.get("squareFootage") as string,
        lotSize: formData.get("lotSize") as string,
        yearBuilt: formData.get("yearBuilt") as string,
        countryId: formData.get("countryId") as string,
        description: formData.get("description") as string,
        cardId: formData.get("cardId") as string
    };

    const validatedFields = ListingSchema.safeParse(listingValues as unknown as z.infer<typeof ListingSchema>);
    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }
    const {
        street,
        city,
        stateId,
        zipcode,
        listingImages,
        propertyType,
        price,
        parking,
        bedrooms,
        bathrooms,
        squareFootage,
        lotSize,
        yearBuilt,
        countryId,
        description,
        cardId
    } = validatedFields.data;

    try {
        const {data: cardData, error: cardError} = await supabase
            .from("cardListings")
            .insert([{
                street: street,
                city: city,
                stateId: parseInt(stateId) || null,
                zipcode: zipcode,
                propertyType: propertyType,
                price: parseInt(price) || null,
                parking: parseInt(parking) || null,
                bedrooms: parseInt(bedrooms) || null,
                bathrooms: parseInt(bathrooms) || null,
                squareFootage: parseInt(squareFootage) || null,
                lotSize: parseInt(lotSize) || null,
                yearBuilt: parseInt(yearBuilt),
                countryId: countryId,
                description: description || null,
                card_uuid: cardId
            }])
            .select("id , listing_uuid");
        const listingUUIDs = cardData?.map(item => item.listing_uuid) as string[];
        for (const image of listingImages) {
            const {data: ImgData, error: ImgError} = await supabase.storage
                .from("ListingImages")
                .upload(`${cardId as string}/${listingUUIDs[0]}/${image.name}`, image, {
                    upsert: true,
                });
        }

        //
        // if (ImgError) {
        //     console.log(ImgError);
        // }

        // return { data: cardData, imageUpload: ImgData };

    } catch (error) {
        console.log(error);
        return {error: "An error occurred during the operation."};
    }
};
