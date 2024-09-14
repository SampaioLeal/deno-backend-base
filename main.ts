import { context } from "./utils/context.ts";
import { initializeMainContext } from "./contexts/main.context.ts";
import { initializeHTTPServer } from "./6-http/server.ts";

initializeMainContext(context);
initializeHTTPServer();
