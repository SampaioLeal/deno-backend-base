import { context } from "../context.ts";
import { UserEntity } from "../entities/user.entity.ts";
import { UserRepository } from "../repositories/user.repository.ts";

export async function createUser(data: UserEntity) {
  const userRepository = context.get("user-repository") as UserRepository;
  const createdUser = await userRepository.create(data);

  return createdUser;
}
