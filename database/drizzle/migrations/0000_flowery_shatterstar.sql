CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"identifier" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(512) NOT NULL,
	CONSTRAINT "users_identifier_unique" UNIQUE("identifier"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
