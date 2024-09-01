import { Hono } from "hono";
import { errorMiddleware } from "./middlewares/error.middleware.ts";
import { jsonMiddleware } from "./middlewares/json.middleware.ts";

export function initializeHTTPMiddlewares(app: Hono) {
  app.onError(errorMiddleware);
  app.use(jsonMiddleware);
}
