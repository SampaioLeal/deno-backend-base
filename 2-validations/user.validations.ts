import { z } from "zod";
import { UserEntity } from "../1-entities/user.entity.ts";

export const UserSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  identifier: z.string().min(1),
  password: z.string().min(8),
}) satisfies z.ZodType<UserEntity>;
