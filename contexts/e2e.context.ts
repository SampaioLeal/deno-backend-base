import { createDrizzleTestClient } from "../__tests__/create-test-database.ts";
import { UserDrizzleRepository } from "../database/drizzle/repositories/user.repository.ts";
import { Context } from "@dest/context.ts";
import { HashPasswordArgon2Service } from "../services/argon2/hash-password.service.ts";

export async function initializeE2EContext(context: Context) {
  context.bind("drizzle-client", await createDrizzleTestClient());

  context.bind("user-repository", UserDrizzleRepository);
  context.bind("hash-password-service", HashPasswordArgon2Service);
}
