import { z, ZodError } from "zod";
import { ValidationError } from "../errors/validation.error.ts";

export function validateZodSchema(body: object, schema: z.ZodSchema) {
  try {
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError(
        `Error validating zod schema '${schema.description}'`,
        error.errors.map((error) => ({
          message: error.message,
          path: error.path.join("."),
        })),
      );
    }

    throw new Error(`Unexpected error validating zod schema '${schema}'`);
  }
}
