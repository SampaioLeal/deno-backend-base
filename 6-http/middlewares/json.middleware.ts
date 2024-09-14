import { createMiddleware } from "hono/factory";
import { HttpError } from "@dest/errors/http.error.ts";

export const jsonMiddleware = createMiddleware(async (ctx, next) => {
  const contentType = ctx.req.header("Content-Type");

  if (!contentType || !contentType.includes("application/json")) {
    throw new HttpError("Invalid body", 400);
  }

  await next();
});
