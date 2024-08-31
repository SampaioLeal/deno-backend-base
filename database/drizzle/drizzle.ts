import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "npm:postgres";
import * as schema from "./schema.ts";

export function createDrizzleClient() {
  const connectionString = Deno.env.get("DATABASE_URL");

  if (!connectionString) {
    throw new Error("Database URL is not defined");
  }

  const client = postgres(connectionString);

  return drizzle(client, { schema });
}

export type DrizzleClient = PostgresJsDatabase<typeof schema>;
