import { sendJson } from "@dest/http/responses.ts";
import { HttpError } from "@dest/http/errors.ts";
import { validateZodSchema } from "@dest/validation/zod.ts";
import { UserSchema } from "../../2-validations/user.validations.ts";
import { createUser } from "../../4-use-cases/user.usecase.ts";

export async function createUserController(req: Request): Promise<Response> {
  if (req.headers.get("Content-Type") !== "application/json") {
    throw new HttpError("Invalid body", 400);
  }

  const body = await req.json();
  const newUser = validateZodSchema(body, UserSchema);
  const createdUser = await createUser(newUser);

  return sendJson({ ...createdUser, password: undefined });
}
