import { context } from "@utils/context.ts";
import { UserEntity } from "../../../1-entities/user.entity.ts";
import { UserRepository } from "../../../3-repositories/user.repository.ts";
import { DrizzleClient } from "../drizzle.ts";
import { users } from "../schema.ts";

// TODO: integration test

async function createUser(data: UserEntity) {
  const drizzle = context.get("drizzle-client") as DrizzleClient;
  const [result] = await drizzle.db.insert(users).values(data).returning();

  // TODO: validate if password is encrypted

  if (!result) {
    throw new Error("Error while inserting user");
  }

  return {
    ...result,
    password: undefined,
  };
}

export const UserDrizzleRepository: UserRepository = {
  create: createUser,
};
