import { Hono } from "hono";
import { initializeHTTPRoutes } from "../http/routes.ts";
import { initializeHTTPMiddlewares } from "../http/middlewares.ts";

export function createTestServer() {
  const app = new Hono();

  initializeHTTPMiddlewares(app);
  initializeHTTPRoutes(app);

  return app;
}
