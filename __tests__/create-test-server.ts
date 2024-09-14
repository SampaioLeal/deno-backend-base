import { Hono } from "hono";
import { initializeHTTPRoutes } from "../6-http/routes.ts";
import { initializeHTTPMiddlewares } from "../6-http/middlewares.ts";

export function createTestServer() {
  const app = new Hono();

  initializeHTTPMiddlewares(app);
  initializeHTTPRoutes(app);

  return app;
}
