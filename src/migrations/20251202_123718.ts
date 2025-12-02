import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'de');
  CREATE TYPE "public"."enum_gyms_working_hours_days" AS ENUM('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');
  CREATE TYPE "public"."enum_categories_gender" AS ENUM('male', 'female');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"background_color" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"from" timestamp(3) with time zone NOT NULL,
  	"until" timestamp(3) with time zone NOT NULL,
  	"gym_id" integer NOT NULL,
  	"location" varchar,
  	"hero_image_id" integer,
  	"card_image_id" integer,
  	"timeframe_start" timestamp(3) with time zone NOT NULL,
  	"timeframe_end" timestamp(3) with time zone NOT NULL,
  	"registration_start" timestamp(3) with time zone NOT NULL,
  	"registration_end" timestamp(3) with time zone NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"content" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "gyms_working_hours_days" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_gyms_working_hours_days",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "gyms_working_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"from" numeric NOT NULL,
  	"to" numeric NOT NULL
  );
  
  CREATE TABLE "gyms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"hero_image_id" integer,
  	"location" varchar NOT NULL,
  	"phone" varchar,
  	"email" varchar,
  	"website" varchar,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gyms_locales" (
  	"information" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "gyms_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "members_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"user_name" varchar NOT NULL,
  	"phone_number" varchar,
  	"terms_accepted_at" timestamp(3) with time zone,
  	"full_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "members_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"event_registrations_id" integer
  );
  
  CREATE TABLE "results" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"member_id" integer NOT NULL,
  	"event_id" integer NOT NULL,
  	"stage_id" integer NOT NULL,
  	"category_id" integer NOT NULL,
  	"goal" varchar NOT NULL,
  	"points" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "stages_goals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"base_score" numeric NOT NULL,
  	"coefficient" numeric DEFAULT 1
  );
  
  CREATE TABLE "stages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"location" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "event_registrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_id" integer NOT NULL,
  	"member_id" integer NOT NULL,
  	"category_id" integer NOT NULL,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"age_from" numeric,
  	"age_to" numeric,
  	"gender" "enum_categories_gender",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"event_registrations_id" integer
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"news_image_id" integer,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_locales" (
  	"title" varchar NOT NULL,
  	"intro" varchar,
  	"content" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"events_id" integer,
  	"gyms_id" integer,
  	"members_id" integer,
  	"results_id" integer,
  	"stages_id" integer,
  	"event_registrations_id" integer,
  	"categories_id" integer,
  	"news_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"members_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_gym_id_gyms_id_fk" FOREIGN KEY ("gym_id") REFERENCES "public"."gyms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gyms_working_hours_days" ADD CONSTRAINT "gyms_working_hours_days_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gyms_working_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gyms_working_hours" ADD CONSTRAINT "gyms_working_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gyms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gyms" ADD CONSTRAINT "gyms_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gyms_locales" ADD CONSTRAINT "gyms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gyms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gyms_rels" ADD CONSTRAINT "gyms_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gyms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gyms_rels" ADD CONSTRAINT "gyms_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_sessions" ADD CONSTRAINT "members_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_event_registrations_fk" FOREIGN KEY ("event_registrations_id") REFERENCES "public"."event_registrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results" ADD CONSTRAINT "results_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "results" ADD CONSTRAINT "results_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "results" ADD CONSTRAINT "results_stage_id_stages_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."stages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "results" ADD CONSTRAINT "results_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stages_goals" ADD CONSTRAINT "stages_goals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stages" ADD CONSTRAINT "stages_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stages" ADD CONSTRAINT "stages_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_rels" ADD CONSTRAINT "categories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_rels" ADD CONSTRAINT "categories_rels_event_registrations_fk" FOREIGN KEY ("event_registrations_id") REFERENCES "public"."event_registrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_news_image_id_media_id_fk" FOREIGN KEY ("news_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gyms_fk" FOREIGN KEY ("gyms_id") REFERENCES "public"."gyms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_results_fk" FOREIGN KEY ("results_id") REFERENCES "public"."results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stages_fk" FOREIGN KEY ("stages_id") REFERENCES "public"."stages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_registrations_fk" FOREIGN KEY ("event_registrations_id") REFERENCES "public"."event_registrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "events__order_idx" ON "events" USING btree ("_order");
  CREATE INDEX "events_gym_idx" ON "events" USING btree ("gym_id");
  CREATE INDEX "events_hero_image_idx" ON "events" USING btree ("hero_image_id");
  CREATE INDEX "events_card_image_idx" ON "events" USING btree ("card_image_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_media_id_idx" ON "events_rels" USING btree ("media_id");
  CREATE INDEX "gyms_working_hours_days_order_idx" ON "gyms_working_hours_days" USING btree ("order");
  CREATE INDEX "gyms_working_hours_days_parent_idx" ON "gyms_working_hours_days" USING btree ("parent_id");
  CREATE INDEX "gyms_working_hours_order_idx" ON "gyms_working_hours" USING btree ("_order");
  CREATE INDEX "gyms_working_hours_parent_id_idx" ON "gyms_working_hours" USING btree ("_parent_id");
  CREATE INDEX "gyms__order_idx" ON "gyms" USING btree ("_order");
  CREATE INDEX "gyms_hero_image_idx" ON "gyms" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "gyms_slug_idx" ON "gyms" USING btree ("slug");
  CREATE INDEX "gyms_updated_at_idx" ON "gyms" USING btree ("updated_at");
  CREATE INDEX "gyms_created_at_idx" ON "gyms" USING btree ("created_at");
  CREATE UNIQUE INDEX "gyms_locales_locale_parent_id_unique" ON "gyms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "gyms_rels_order_idx" ON "gyms_rels" USING btree ("order");
  CREATE INDEX "gyms_rels_parent_idx" ON "gyms_rels" USING btree ("parent_id");
  CREATE INDEX "gyms_rels_path_idx" ON "gyms_rels" USING btree ("path");
  CREATE INDEX "gyms_rels_media_id_idx" ON "gyms_rels" USING btree ("media_id");
  CREATE INDEX "members_sessions_order_idx" ON "members_sessions" USING btree ("_order");
  CREATE INDEX "members_sessions_parent_id_idx" ON "members_sessions" USING btree ("_parent_id");
  CREATE INDEX "members_updated_at_idx" ON "members" USING btree ("updated_at");
  CREATE INDEX "members_created_at_idx" ON "members" USING btree ("created_at");
  CREATE UNIQUE INDEX "members_email_idx" ON "members" USING btree ("email");
  CREATE INDEX "members_rels_order_idx" ON "members_rels" USING btree ("order");
  CREATE INDEX "members_rels_parent_idx" ON "members_rels" USING btree ("parent_id");
  CREATE INDEX "members_rels_path_idx" ON "members_rels" USING btree ("path");
  CREATE INDEX "members_rels_event_registrations_id_idx" ON "members_rels" USING btree ("event_registrations_id");
  CREATE INDEX "results_member_idx" ON "results" USING btree ("member_id");
  CREATE INDEX "results_event_idx" ON "results" USING btree ("event_id");
  CREATE INDEX "results_stage_idx" ON "results" USING btree ("stage_id");
  CREATE INDEX "results_category_idx" ON "results" USING btree ("category_id");
  CREATE INDEX "results_updated_at_idx" ON "results" USING btree ("updated_at");
  CREATE INDEX "results_created_at_idx" ON "results" USING btree ("created_at");
  CREATE UNIQUE INDEX "member_event_stage_idx" ON "results" USING btree ("member_id","event_id","stage_id");
  CREATE INDEX "stages_goals_order_idx" ON "stages_goals" USING btree ("_order");
  CREATE INDEX "stages_goals_parent_id_idx" ON "stages_goals" USING btree ("_parent_id");
  CREATE INDEX "stages_event_idx" ON "stages" USING btree ("event_id");
  CREATE INDEX "stages_image_idx" ON "stages" USING btree ("image_id");
  CREATE INDEX "stages_updated_at_idx" ON "stages" USING btree ("updated_at");
  CREATE INDEX "stages_created_at_idx" ON "stages" USING btree ("created_at");
  CREATE INDEX "event_registrations_event_idx" ON "event_registrations" USING btree ("event_id");
  CREATE INDEX "event_registrations_member_idx" ON "event_registrations" USING btree ("member_id");
  CREATE INDEX "event_registrations_category_idx" ON "event_registrations" USING btree ("category_id");
  CREATE INDEX "event_registrations_updated_at_idx" ON "event_registrations" USING btree ("updated_at");
  CREATE INDEX "event_registrations_created_at_idx" ON "event_registrations" USING btree ("created_at");
  CREATE UNIQUE INDEX "member_event_idx" ON "event_registrations" USING btree ("member_id","event_id");
  CREATE INDEX "categories_event_idx" ON "categories" USING btree ("event_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "categories_rels_order_idx" ON "categories_rels" USING btree ("order");
  CREATE INDEX "categories_rels_parent_idx" ON "categories_rels" USING btree ("parent_id");
  CREATE INDEX "categories_rels_path_idx" ON "categories_rels" USING btree ("path");
  CREATE INDEX "categories_rels_event_registrations_id_idx" ON "categories_rels" USING btree ("event_registrations_id");
  CREATE INDEX "news__order_idx" ON "news" USING btree ("_order");
  CREATE INDEX "news_news_image_idx" ON "news" USING btree ("news_image_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE UNIQUE INDEX "news_locales_locale_parent_id_unique" ON "news_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_rels_order_idx" ON "news_rels" USING btree ("order");
  CREATE INDEX "news_rels_parent_idx" ON "news_rels" USING btree ("parent_id");
  CREATE INDEX "news_rels_path_idx" ON "news_rels" USING btree ("path");
  CREATE INDEX "news_rels_media_id_idx" ON "news_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_gyms_id_idx" ON "payload_locked_documents_rels" USING btree ("gyms_id");
  CREATE INDEX "payload_locked_documents_rels_members_id_idx" ON "payload_locked_documents_rels" USING btree ("members_id");
  CREATE INDEX "payload_locked_documents_rels_results_id_idx" ON "payload_locked_documents_rels" USING btree ("results_id");
  CREATE INDEX "payload_locked_documents_rels_stages_id_idx" ON "payload_locked_documents_rels" USING btree ("stages_id");
  CREATE INDEX "payload_locked_documents_rels_event_registrations_id_idx" ON "payload_locked_documents_rels" USING btree ("event_registrations_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_rels_members_id_idx" ON "payload_preferences_rels" USING btree ("members_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_locales" CASCADE;
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "gyms_working_hours_days" CASCADE;
  DROP TABLE "gyms_working_hours" CASCADE;
  DROP TABLE "gyms" CASCADE;
  DROP TABLE "gyms_locales" CASCADE;
  DROP TABLE "gyms_rels" CASCADE;
  DROP TABLE "members_sessions" CASCADE;
  DROP TABLE "members" CASCADE;
  DROP TABLE "members_rels" CASCADE;
  DROP TABLE "results" CASCADE;
  DROP TABLE "stages_goals" CASCADE;
  DROP TABLE "stages" CASCADE;
  DROP TABLE "event_registrations" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_rels" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_locales" CASCADE;
  DROP TABLE "news_rels" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_gyms_working_hours_days";
  DROP TYPE "public"."enum_categories_gender";`)
}
