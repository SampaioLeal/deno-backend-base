import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.ts";

export function createDrizzleClient() {
  const connectionString = Deno.env.get("DATABASE_URL");
  if (!connectionString) {
    throw new Error("Database URL is not defined");
  }

  const client = postgres(connectionString);

  return { client, db: drizzle(client, { schema }) };
}

export type DrizzleClient = {
  client: postgres.Sql<Record<string, unknown>>;
  db: PostgresJsDatabase<typeof schema>;
};
