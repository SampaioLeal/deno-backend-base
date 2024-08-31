import { defineConfig } from "drizzle-kit";

const connectionString = Deno.env.get("DATABASE_URL");

if (!connectionString) {
  throw new Error("Database URL is not defined");
}

export default defineConfig({
  schema: "./database/drizzle/schema.ts",
  out: "./database/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
});
