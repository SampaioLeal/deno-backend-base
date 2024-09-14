import { assertEquals, assertRejects } from "@std/assert";
import { z } from "zod";
import { validateZodSchema } from "./zod.validator.ts";
import { ValidationError } from "../errors/validation.error.ts";

Deno.test("validateZodSchema - deve validar um schema corretamente", () => {
  const schema = z.object({
    name: z.string(),
    age: z.number().min(0),
  });

  const validData = { name: "John", age: 30 };
  const result = validateZodSchema(validData, schema);

  assertEquals(result, validData);
});

Deno.test(
  "validateZodSchema - deve lançar ValidationError para dados inválidos",
  async () => {
    const schema = z.object({
      name: z.string(),
      age: z.number().min(0),
    });

    const invalidData = { name: "John", age: -5 };

    const error = await assertRejects(
      async () => await validateZodSchema(invalidData, schema),
      ValidationError,
    );

    assertEquals(error.message, "Error validating zod schema 'undefined'");
    assertEquals(error.cause, [
      { message: "Expected greater than or equal to 0", path: "age" },
    ]);
  },
);

Deno.test("validateZodSchema - deve lançar erro inesperado", async () => {
  const schema = z.object({
    name: z.string(),
  });

  const invalidData = { name: null }; // Tipo inválido

  await assertRejects(
    async () => await validateZodSchema(invalidData, schema),
    Error,
    `Unexpected error validating zod schema '${schema}'`,
  );
});
