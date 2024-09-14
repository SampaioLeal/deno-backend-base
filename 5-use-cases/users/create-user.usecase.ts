import { context } from "../../utils/context.ts";
import { UserEntity } from "../../1-entities/user.entity.ts";
import { HashPasswordService } from "../../3-services/hash-password.service.ts";
import { UserRepository } from "../../4-repositories/user.repository.ts";

export async function createUser(data: UserEntity) {
  const userRepository = context.get("user-repository") as UserRepository;
  const hashPasswordService = context.get(
    "hash-password-service",
  ) as HashPasswordService;

  const hashedPassword = await hashPasswordService.hash(data.password);
  data.password = hashedPassword;

  const createdUser = await userRepository.create(data);
  if (!createdUser) {
    throw new Error("Error creating user");
  }

  return createdUser;
}
