import { context } from "./utils/context.ts";
import { initializeMainContext } from "@src/contexts/main.context.ts";
import { initializeHTTPServer } from "@src/5-http/server.ts";

initializeMainContext(context);
initializeHTTPServer();
