import { z } from "zod";

export function validateZodSchema(body: object, schema: z.ZodSchema) {
  return schema.parse(body);
}
