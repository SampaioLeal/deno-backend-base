import { UserEntity } from "../1-entities/user.entity.ts";

export interface UserRepository {
  create: (data: UserEntity) => Promise<UserEntity> | UserEntity;
}
