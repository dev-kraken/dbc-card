alter table "public"."listingImages" drop constraint "public_listingImages_listing_uuid_fkey";

alter table "public"."cardListings" alter column "countryId" set data type text using "countryId"::text;

create policy "Policy with security definer functions"
on "public"."cardListings"
as permissive
for all
to authenticated
using (true);



