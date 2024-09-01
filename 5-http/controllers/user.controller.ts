import { sendJson } from "@dest/http/responses.ts";
import { validateZodSchema } from "../../2-validations/mod.ts";
import { UserSchema } from "../../2-validations/user.validations.ts";
import { createUser } from "../../4-use-cases/user.usecase.ts";

export async function createUserController(req: Request): Promise<Response> {
  const body = await req.json();
  const newUser = validateZodSchema(body, UserSchema);
  const createdUser = await createUser(newUser);

  return sendJson({ ...createdUser, password: undefined });
}
