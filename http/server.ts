import { Hono } from "hono";
import { initializeHTTPRoutes } from "./routes.ts";
import { initializeHTTPMiddlewares } from "./middlewares.ts";

export function initializeHTTPServer() {
  const app = new Hono();

  initializeHTTPMiddlewares(app);
  initializeHTTPRoutes(app);

  Deno.serve(
    {
      // TODO: configuration management system (envs, files, providers, etc)
      hostname: Deno.env.get("HOST_NAME") ?? "127.0.0.1",
      port: Number(Deno.env.get("PORT")) || 8000,
      // TODO: use signal for graceful shutdown
      // TODO: use onListen for logging
    },
    app.fetch
  );

  return app;
}
