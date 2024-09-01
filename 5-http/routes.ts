import { Context, Hono } from "hono";
import { createUserController } from "./controllers/user.controller.ts";

type ControllerType = (req: Request) => Promise<Response> | Response;

function handleRoute(controller: ControllerType) {
  return (ctx: Context) => {
    return controller(ctx.req.raw);
  };
}

export function initializeHTTPRoutes(app: Hono) {
  app.post("/user", handleRoute(createUserController));
}
