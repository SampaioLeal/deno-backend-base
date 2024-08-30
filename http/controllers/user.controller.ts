import { UserSchema } from "../../validations/user.validations.ts";
import { validateZodSchema } from "../../lib/validation/zod.ts";
import { sendJson } from "../../lib/http/responses.ts";
import { createUser } from "../../use-cases/user.usecase.ts";
import { HttpError } from "../error.ts";

export async function createUserController(req: Request): Promise<Response> {
  if (req.headers.get("Content-Type") !== "application/json") {
    throw new HttpError("Invalid body", 400);
  }

  const body = await req.json();
  const newUser = validateZodSchema(body, UserSchema);
  const createdUser = await createUser(newUser);

  return sendJson({ ...createdUser, password: undefined });
}
