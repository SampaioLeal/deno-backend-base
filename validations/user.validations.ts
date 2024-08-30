import { z } from "zod";
import { UserEntity } from "../entities/user.entity.ts";

export const UserSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  identifier: z.string().min(1),
  password: z.string().min(8),
  isBlocked: z.boolean(),
}) satisfies z.ZodType<UserEntity>;