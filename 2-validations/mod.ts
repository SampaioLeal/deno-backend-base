import { z, ZodError } from "zod";
import { ValidationError } from "../_lib/errors/validation.error.ts";

// TODO: unit test

export function validateZodSchema(body: object, schema: z.ZodSchema) {
  try {
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      /**
       * I want this function to be in the lib folder but beacuse of ValidationError being a domain error
       * it should not be a "framework" function
       */
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
