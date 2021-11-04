CREATE TABLE "public"."Users" (
    "id" uuid DEFAULT gen_random_uuid(),
    "isDeleted" boolean NOT NULL DEFAULT 'false',
    "login" varchar(50) NOT NULL,
    "password" varchar(200) NOT NULL,
    "age" integer NOT NULL
    PRIMARY KEY ("id"),
    UNIQUE ("login")
);