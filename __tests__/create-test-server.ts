import { Hono } from "hono";
import { initializeHTTPRoutes } from "../5-http/routes.ts";
import { initializeHTTPMiddlewares } from "../5-http/middlewares.ts";

export function createTestServer() {
  const app = new Hono();

  initializeHTTPMiddlewares(app);
  initializeHTTPRoutes(app);

  return app;
}
