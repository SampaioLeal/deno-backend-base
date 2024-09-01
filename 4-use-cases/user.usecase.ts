import { context } from "../utils/context.ts";
import { UserEntity } from "../1-entities/user.entity.ts";
import { validateZodSchema } from "../2-validations/mod.ts";
import { UserSchema } from "../2-validations/user.validations.ts";
import { UserRepository } from "../3-repositories/user.repository.ts";

export async function createUser(data: UserEntity) {
  const userRepository = context.get("user-repository") as UserRepository;
  const newUser = validateZodSchema(data, UserSchema);

  // TODO: hash user password
  const createdUser = await userRepository.create(newUser);

  if (!createdUser) {
    throw new Error("Error creating user");
  }

  return createdUser;
}
