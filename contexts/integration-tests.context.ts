import { createDrizzleClient } from "../database/drizzle/drizzle.ts";
import { UserDrizzleRepository } from "../database/drizzle/repositories/user.repository.ts";
import { Context } from "@dest/context.ts";
import { HashPasswordArgon2Service } from "../services/argon2/hash-password.service.ts";

export function initializeIntegrationTestsContext(context: Context) {
  context.bind("drizzle-client", createDrizzleClient());

  context.bind("user-repository", UserDrizzleRepository);
  context.bind("hash-password-service", HashPasswordArgon2Service);
}
