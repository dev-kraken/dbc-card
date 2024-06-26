create table "public"."cardProfile" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "profileName" text not null,
    "licenseNumber" text not null,
    "subHeader" text,
    "bio" character varying not null,
    "profileImg" character varying,
    "cardId" uuid not null default gen_random_uuid(),
    "isDeleted" boolean not null default false
);


alter table "public"."cardProfile" enable row level security;

create table "public"."cards" (
    "id" bigint generated by default as identity not null,
    "userId" uuid default auth.uid(),
    "cardId" uuid not null default gen_random_uuid(),
    "cardName" text not null,
    "avatarUrl" character varying not null,
    "createdAt" timestamp without time zone not null default now(),
    "isDeleted" boolean not null default false
);


alter table "public"."cards" enable row level security;

CREATE UNIQUE INDEX "cardProfile_cardId_key" ON public."cardProfile" USING btree ("cardId");

CREATE UNIQUE INDEX "cardProfile_id_key" ON public."cardProfile" USING btree (id);

CREATE UNIQUE INDEX "cardProfile_pkey" ON public."cardProfile" USING btree (id);

CREATE UNIQUE INDEX "cards_avatarUrl_key" ON public.cards USING btree ("avatarUrl");

CREATE UNIQUE INDEX "cards_cardId_key" ON public.cards USING btree ("cardId");

CREATE UNIQUE INDEX cards_pkey ON public.cards USING btree (id);

alter table "public"."cardProfile" add constraint "cardProfile_pkey" PRIMARY KEY using index "cardProfile_pkey";

alter table "public"."cards" add constraint "cards_pkey" PRIMARY KEY using index "cards_pkey";

alter table "public"."cardProfile" add constraint "cardProfile_cardId_key" UNIQUE using index "cardProfile_cardId_key";

alter table "public"."cardProfile" add constraint "cardProfile_id_key" UNIQUE using index "cardProfile_id_key";

alter table "public"."cardProfile" add constraint "public_cardProfile_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES cards("cardId") ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."cardProfile" validate constraint "public_cardProfile_cardId_fkey";

alter table "public"."cards" add constraint "cards_avatarUrl_key" UNIQUE using index "cards_avatarUrl_key";

alter table "public"."cards" add constraint "cards_cardId_key" UNIQUE using index "cards_cardId_key";

alter table "public"."cards" add constraint "public_cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT not valid;

alter table "public"."cards" validate constraint "public_cards_userId_fkey";

grant delete on table "public"."cardProfile" to "anon";

grant insert on table "public"."cardProfile" to "anon";

grant references on table "public"."cardProfile" to "anon";

grant select on table "public"."cardProfile" to "anon";

grant trigger on table "public"."cardProfile" to "anon";

grant truncate on table "public"."cardProfile" to "anon";

grant update on table "public"."cardProfile" to "anon";

grant delete on table "public"."cardProfile" to "authenticated";

grant insert on table "public"."cardProfile" to "authenticated";

grant references on table "public"."cardProfile" to "authenticated";

grant select on table "public"."cardProfile" to "authenticated";

grant trigger on table "public"."cardProfile" to "authenticated";

grant truncate on table "public"."cardProfile" to "authenticated";

grant update on table "public"."cardProfile" to "authenticated";

grant delete on table "public"."cardProfile" to "service_role";

grant insert on table "public"."cardProfile" to "service_role";

grant references on table "public"."cardProfile" to "service_role";

grant select on table "public"."cardProfile" to "service_role";

grant trigger on table "public"."cardProfile" to "service_role";

grant truncate on table "public"."cardProfile" to "service_role";

grant update on table "public"."cardProfile" to "service_role";

grant delete on table "public"."cards" to "anon";

grant insert on table "public"."cards" to "anon";

grant references on table "public"."cards" to "anon";

grant select on table "public"."cards" to "anon";

grant trigger on table "public"."cards" to "anon";

grant truncate on table "public"."cards" to "anon";

grant update on table "public"."cards" to "anon";

grant delete on table "public"."cards" to "authenticated";

grant insert on table "public"."cards" to "authenticated";

grant references on table "public"."cards" to "authenticated";

grant select on table "public"."cards" to "authenticated";

grant trigger on table "public"."cards" to "authenticated";

grant truncate on table "public"."cards" to "authenticated";

grant update on table "public"."cards" to "authenticated";

grant delete on table "public"."cards" to "service_role";

grant insert on table "public"."cards" to "service_role";

grant references on table "public"."cards" to "service_role";

grant select on table "public"."cards" to "service_role";

grant trigger on table "public"."cards" to "service_role";

grant truncate on table "public"."cards" to "service_role";

grant update on table "public"."cards" to "service_role";

create policy "Enable read access for all users"
on "public"."cardProfile"
as permissive
for all
to public
using (true);


create policy "All Cards"
on "public"."cards"
as permissive
for all
to authenticated
using (true);



