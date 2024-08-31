import { createDrizzleClient } from "../database/drizzle/drizzle.ts";
import { UserDrizzleRepository } from "../database/drizzle/repositories/user.repository.ts";
import { Context } from "../lib/context.ts";

export function initializeUnitTestsContext(context: Context) {
  context.bind("drizzle-client", createDrizzleClient());

  context.bind("user-repository", UserDrizzleRepository);
}
