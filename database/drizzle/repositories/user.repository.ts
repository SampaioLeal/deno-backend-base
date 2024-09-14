import { eq } from "drizzle-orm";
import { context } from "@utils/context.ts";
import { UserEntity } from "../../../1-entities/user.entity.ts";
import { UserRepository } from "../../../4-repositories/user.repository.ts";
import { DrizzleClient } from "../drizzle.ts";
import { users } from "../schema.ts";

async function createUser(data: UserEntity): Promise<UserEntity> {
  const drizzle = context.get("drizzle-client") as DrizzleClient;
  const [result] = await drizzle.db.insert(users).values(data).returning();

  if (!result) {
    throw new Error("Error while inserting user");
  }

  return result;
}

async function findUserById(id: string): Promise<UserEntity | null> {
  const drizzle = context.get("drizzle-client") as DrizzleClient;
  const result = await drizzle.db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .execute();

  if (!result) {
    throw new Error("User not found");
  }

  return result[0];
}

async function updateUser(
  id: string,
  data: Partial<UserEntity>,
): Promise<UserEntity | null> {
  const drizzle = context.get("drizzle-client") as DrizzleClient;
  const [result] = await drizzle.db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();

  if (!result) {
    throw new Error("Error while updating user");
  }

  return result;
}

async function deleteUser(id: string): Promise<boolean> {
  const drizzle = context.get("drizzle-client") as DrizzleClient;
  const result = await drizzle.db
    .delete(users)
    .where(eq(users.id, id))
    .execute();

  if (!result) {
    throw new Error("Error while deleting user");
  }

  return true;
}

async function findAllUsers(
  page: number = 1,
  limit: number = 10,
): Promise<UserEntity[]> {
  const drizzle = context.get("drizzle-client") as DrizzleClient;
  const offset = (page - 1) * limit;
  const results = await drizzle.db
    .select()
    .from(users)
    .limit(limit)
    .offset(offset)
    .execute();

  if (!results) {
    throw new Error("Error while fetching users");
  }

  return results;
}

export const UserDrizzleRepository: UserRepository = {
  create: createUser,
  findById: findUserById,
  update: updateUser,
  remove: deleteUser,
  findAll: findAllUsers,
};
