create table "public"."cardSocialMedia" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "value" character varying not null,
    "priority" integer not null,
    "cardId" uuid not null default gen_random_uuid(),
    "socialNetworkId" bigint not null
);


alter table "public"."cardSocialMedia" enable row level security;

alter table "public"."SocialMediaNetwork" add column "isDisabled" boolean not null default false;

CREATE UNIQUE INDEX "cardSocialMedia_pkey" ON public."cardSocialMedia" USING btree (id);

alter table "public"."cardSocialMedia" add constraint "cardSocialMedia_pkey" PRIMARY KEY using index "cardSocialMedia_pkey";

alter table "public"."cardSocialMedia" add constraint "public_cardSocialMedia_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES cards("cardId") not valid;

alter table "public"."cardSocialMedia" validate constraint "public_cardSocialMedia_cardId_fkey";

alter table "public"."cardSocialMedia" add constraint "public_cardSocialMedia_socialNetworkId_fkey" FOREIGN KEY ("socialNetworkId") REFERENCES "SocialMediaNetwork"(id) not valid;

alter table "public"."cardSocialMedia" validate constraint "public_cardSocialMedia_socialNetworkId_fkey";

grant delete on table "public"."cardSocialMedia" to "anon";

grant insert on table "public"."cardSocialMedia" to "anon";

grant references on table "public"."cardSocialMedia" to "anon";

grant select on table "public"."cardSocialMedia" to "anon";

grant trigger on table "public"."cardSocialMedia" to "anon";

grant truncate on table "public"."cardSocialMedia" to "anon";

grant update on table "public"."cardSocialMedia" to "anon";

grant delete on table "public"."cardSocialMedia" to "authenticated";

grant insert on table "public"."cardSocialMedia" to "authenticated";

grant references on table "public"."cardSocialMedia" to "authenticated";

grant select on table "public"."cardSocialMedia" to "authenticated";

grant trigger on table "public"."cardSocialMedia" to "authenticated";

grant truncate on table "public"."cardSocialMedia" to "authenticated";

grant update on table "public"."cardSocialMedia" to "authenticated";

grant delete on table "public"."cardSocialMedia" to "service_role";

grant insert on table "public"."cardSocialMedia" to "service_role";

grant references on table "public"."cardSocialMedia" to "service_role";

grant select on table "public"."cardSocialMedia" to "service_role";

grant trigger on table "public"."cardSocialMedia" to "service_role";

grant truncate on table "public"."cardSocialMedia" to "service_role";

grant update on table "public"."cardSocialMedia" to "service_role";

create policy "Enable read access for all users"
on "public"."SocialMediaNetwork"
as permissive
for select
to public
using (true);



