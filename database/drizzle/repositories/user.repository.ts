import { context } from "@src/context.ts";
import { UserEntity } from "@src/1-entities/user.entity.ts";
import { DrizzleClient } from "../drizzle.ts";
import { users } from "../schema.ts";

async function createUser(data: UserEntity) {
  const drizzle = context.get("drizzle-client") as DrizzleClient;
  const [result] = await drizzle.db.insert(users).values(data).returning();

  return { ...result, password: undefined };
}

export const UserDrizzleRepository = {
  create: createUser,
};
