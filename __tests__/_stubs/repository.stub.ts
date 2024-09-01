import { UserEntity } from "@src/1-entities/user.entity.ts";
import { spy } from "@std/testing/mock";

function create(data: UserEntity) {
  return data;
}

export const GenericRepositorySpy = {
  create: spy(create),
};

export type GenericRepositorySpy = typeof GenericRepositorySpy;
