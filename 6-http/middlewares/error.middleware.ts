import { Context } from "hono";
import postgres from "postgres";
import { messages } from "@electric-sql/pglite";
import { sendJson } from "@dest/http/responses.ts";
import { HttpError } from "@dest/errors/http.error.ts";
import { ValidationError } from "@dest/errors/validation.error.ts";

// TODO: unit test

export function errorMiddleware(error: Error, _ctx: Context) {
  if (error instanceof HttpError) {
    return sendJson({ message: error.message }, { status: error.status });
  }

  if (error instanceof ValidationError) {
    return sendJson(
      { message: "Validation Error", cause: error.cause },
      { status: 400 },
    );
  }

  if (error instanceof postgres.PostgresError) {
    return sendJson({ message: "Bad Request" }, { status: 400 });
  }

  if (error instanceof messages.DatabaseError) {
    return sendJson({ message: "Bad Request" }, { status: 400 });
  }

  return sendJson({ message: "Internal Server Error" }, { status: 500 });
}
