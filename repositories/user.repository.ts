import { UserEntity } from "../entities/user.entity.ts";

export interface UserRepository {
  create: (data: UserEntity) => Promise<UserEntity> | UserEntity;
}
