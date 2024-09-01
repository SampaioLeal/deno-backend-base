import { z } from "zod";
import { HttpError } from "../http/errors.ts";

// TODO: unit test

export function validateZodSchema(body: object, schema: z.ZodSchema) {
  try {
    return schema.parse(body);
  } catch (_error) {
    throw new HttpError("Bad Request", 400);
  }
}
