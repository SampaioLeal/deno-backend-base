import { sendJson } from "@dest/http/responses.ts";
import { HttpError } from "@dest/http/errors.ts";
import { Context } from "hono";
import postgres from "postgres";

export function errorMiddleware(error: Error, _ctx: Context) {
  if (error instanceof HttpError) {
    return sendJson({ message: error.message }, { status: error.status });
  }

  if (error instanceof postgres.PostgresError) {
    return sendJson({ message: "Bad Request" }, { status: 400 });
  }

  return sendJson({ message: "Internal Server Error" }, { status: 500 });
}
