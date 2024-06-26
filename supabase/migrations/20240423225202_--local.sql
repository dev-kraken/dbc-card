create table "public"."SocialMediaNetwork" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "icon" text not null,
    "isDeleted" boolean not null default false
);


alter table "public"."SocialMediaNetwork" enable row level security;

CREATE UNIQUE INDEX "SocialMediaNetwork_pkey" ON public."SocialMediaNetwork" USING btree (id);

alter table "public"."SocialMediaNetwork" add constraint "SocialMediaNetwork_pkey" PRIMARY KEY using index "SocialMediaNetwork_pkey";

grant delete on table "public"."SocialMediaNetwork" to "anon";

grant insert on table "public"."SocialMediaNetwork" to "anon";

grant references on table "public"."SocialMediaNetwork" to "anon";

grant select on table "public"."SocialMediaNetwork" to "anon";

grant trigger on table "public"."SocialMediaNetwork" to "anon";

grant truncate on table "public"."SocialMediaNetwork" to "anon";

grant update on table "public"."SocialMediaNetwork" to "anon";

grant delete on table "public"."SocialMediaNetwork" to "authenticated";

grant insert on table "public"."SocialMediaNetwork" to "authenticated";

grant references on table "public"."SocialMediaNetwork" to "authenticated";

grant select on table "public"."SocialMediaNetwork" to "authenticated";

grant trigger on table "public"."SocialMediaNetwork" to "authenticated";

grant truncate on table "public"."SocialMediaNetwork" to "authenticated";

grant update on table "public"."SocialMediaNetwork" to "authenticated";

grant delete on table "public"."SocialMediaNetwork" to "service_role";

grant insert on table "public"."SocialMediaNetwork" to "service_role";

grant references on table "public"."SocialMediaNetwork" to "service_role";

grant select on table "public"."SocialMediaNetwork" to "service_role";

grant trigger on table "public"."SocialMediaNetwork" to "service_role";

grant truncate on table "public"."SocialMediaNetwork" to "service_role";

grant update on table "public"."SocialMediaNetwork" to "service_role";


