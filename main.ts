import { context } from "./context.ts";
import { initializeMainContext } from "./contexts/main.context.ts";
import { initializeHTTPServer } from "./http/server.ts";

initializeMainContext(context);
initializeHTTPServer();
