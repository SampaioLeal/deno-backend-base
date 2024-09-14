import { UserEntity } from "../1-entities/user.entity.ts";

export interface UserRepository {
  create: (data: UserEntity) => Promise<UserEntity>;
  findById: (id: string) => Promise<UserEntity | null>;
  update: (id: string, data: Partial<UserEntity>) => Promise<UserEntity | null>;
  remove: (id: string) => Promise<boolean>;
  findAll: (page: number, limit: number) => Promise<UserEntity[]>;
}
