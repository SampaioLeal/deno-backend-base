import { createPrismaClient } from "../database/prisma/prisma.ts";
import { UserPrismaRepository } from "../database/prisma/repositories/user.repository.ts";
import { Context } from "../lib/context.ts";

export function initializeIntegrationTestsContext(context: Context) {
  context.bind("prisma-client", createPrismaClient());

  context.bind("user-repository", UserPrismaRepository);
}
