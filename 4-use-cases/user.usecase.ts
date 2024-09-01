import { context } from "../utils/context.ts";
import { UserEntity } from "../1-entities/user.entity.ts";
import { UserRepository } from "../3-repositories/user.repository.ts";

export async function createUser(data: UserEntity) {
  const userRepository = context.get("user-repository") as UserRepository;
  const createdUser = await userRepository.create(data);

  return createdUser;
}
