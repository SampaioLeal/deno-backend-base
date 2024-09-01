import { drizzle, PgliteDatabase } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { PGlite } from "@electric-sql/pglite";
import * as schema from "../database/drizzle/schema.ts";

export async function createDrizzleTestClient() {
  const client = new PGlite({
    database: "deno",
    username: "postgres",
  });

  const db = drizzle(client, { schema });

  await migrate(db, { migrationsFolder: "./database/drizzle/migrations" });

  return { client, db };
}

export type DrizzleTestClient = {
  client: PGlite;
  db: PgliteDatabase<typeof schema>;
};
