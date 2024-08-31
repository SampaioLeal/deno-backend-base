import { Context } from "hono";
import { sendJson } from "../../lib/http/responses.ts";
import { HttpError } from "../error.ts";

export function errorMiddleware(error: Error, _ctx: Context) {
  console.log(error);

  if (error instanceof HttpError) {
    return sendJson({ message: error.message }, { status: error.status });
  }

  return sendJson({ message: "Internal Server Error" }, { status: 500 });
}
