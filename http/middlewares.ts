import { Hono } from "hono";
import { errorMiddleware } from "./middlewares/error.middleware.ts";

export function initializeHTTPMiddlewares(app: Hono) {
  app.onError(errorMiddleware);
}
