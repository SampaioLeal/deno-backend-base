import { context } from "../../../context.ts";
import { UserEntity } from "../../../entities/user.entity.ts";
import { DrizzleClient } from "../drizzle.ts";
import { users } from "../schema.ts";

async function createUser(data: UserEntity) {
  const drizzle = context.get("drizzle-client") as DrizzleClient;
  // @ts-ignore: Unreachable code error
  const [result] = await drizzle.insert(users).values(data).returning();

  return { ...result, password: undefined };
}

export const UserDrizzleRepository = {
  create: createUser,
};
