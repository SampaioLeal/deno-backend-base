import { context } from "../../context.ts";
import { initializeMainContext } from "../../contexts/main.context.ts";
import { createTestServer } from "../create-test-server.ts";
import { assertEquals } from "@std/assert";

const testServer = createTestServer();
initializeMainContext(context);

// TODO: reuse generic e2e tests
Deno.test("Users E2E", async (t) => {
  await t.step("should return error 400 when no body is passed", async () => {
    const response = await testServer.request("/user", {
      method: "POST",
    });
    const responseBody = await response.json();

    assertEquals(response.status, 400);
    assertEquals(responseBody, {
      message: "Invalid body",
    });
  });
});
