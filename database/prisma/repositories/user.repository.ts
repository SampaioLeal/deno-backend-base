import { context } from "../../../context.ts";
import { UserEntity } from "../../../entities/user.entity.ts";
import { PrismaClient } from "../generated/deno/index.d.ts";

async function createUser(data: UserEntity) {
  const prisma = context.get("prisma-client") as PrismaClient;

  const user = await prisma.user.create({
    data: {
      ...data,
    },
    select: {
      password: false,
    },
  });

  return user;
}

export const UserPrismaRepository = {
  create: createUser,
};
