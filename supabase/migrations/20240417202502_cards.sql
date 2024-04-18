create table "public"."cards" (
    "id" bigint generated by default as identity not null,
    "userId" uuid default auth.uid(),
    "cardId" uuid default gen_random_uuid(),
    "cardName" text not null,
    "avatarUrl" character varying not null,
    "createdAt" timestamp without time zone not null default now(),
    "isDeleted" boolean not null default false
);


alter table "public"."cards" enable row level security;

CREATE UNIQUE INDEX "cards_avatarUrl_key" ON public.cards USING btree ("avatarUrl");

CREATE UNIQUE INDEX cards_pkey ON public.cards USING btree (id);

alter table "public"."cards" add constraint "cards_pkey" PRIMARY KEY using index "cards_pkey";

alter table "public"."cards" add constraint "cards_avatarUrl_key" UNIQUE using index "cards_avatarUrl_key";

alter table "public"."cards" add constraint "public_cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT not valid;

alter table "public"."cards" validate constraint "public_cards_userId_fkey";

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

create policy "All Cards"
on "public"."cards"
as permissive
for all
to authenticated
using (true);


