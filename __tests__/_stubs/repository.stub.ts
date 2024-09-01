import { UserEntity } from "../../1-entities/user.entity.ts";

function create(data: UserEntity) {
  const result = { ...data, id: "uuid", password: undefined };
  delete result.password;

  return result as Omit<UserEntity, "password">;
}

export const GenericTestRepository = {
  create,
};

export type GenericTestRepository = typeof GenericTestRepository;
