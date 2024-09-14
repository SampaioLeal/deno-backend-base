import { sendJson } from "@dest/http/responses.ts";
import { validateZodSchema } from "@dest/validator/zod.validator.ts";
import { UserSchema } from "../../2-validations/user.validations.ts";
import { createUser } from "../../5-use-cases/users/create-user.usecase.ts";

export async function createUserController(req: Request): Promise<Response> {
  const body = await req.json();
  const newUser = validateZodSchema(body, UserSchema);
  const createdUser = await createUser(newUser);

  return sendJson({ ...createdUser, password: undefined });
}
