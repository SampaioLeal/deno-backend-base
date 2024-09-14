import { assertEquals, assertExists } from "@std/assert";
import { context } from "../../utils/context.ts";
import { initializeE2EContext } from "../../contexts/e2e.context.ts";
import { UserEntity } from "../../1-entities/user.entity.ts";
import { createTestServer } from "../create-test-server.ts";
import { DrizzleTestClient } from "../create-test-database.ts";

const testServer = createTestServer();
await initializeE2EContext(context);

// TODO: reuse generic e2e tests
Deno.test("Users E2E", async (t) => {
  const userMock: UserEntity = {
    email: "test@test.com",
    firstName: "Testerson",
    lastName: "Testhonson",
    identifier: "123",
    password: "testing123#",
  };

  await t.step("should return error 400 when no body is passed", async () => {
    const response = await testServer.request("/user", { method: "POST" });
    const responseBody = await response.json();

    assertEquals(response.status, 400);
    assertEquals(responseBody, { message: "Invalid body" });
  });

  await t.step(
    "should return error 400 when wrong body is passed",
    async () => {
      const response = await testServer.request("/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...userMock,
          identifier: undefined,
          email: null,
        }),
      });
      const responseBody = await response.json();

      assertEquals(response.status, 400);
      assertEquals(responseBody, {
        message: "Validation Error",
        cause: [
          { path: "email", message: "Expected string, received null" },
          { path: "identifier", message: "Required" },
        ],
      });
    }
  );

  await t.step("should return error 400 when using invalid email", async () => {
    const response = await testServer.request("/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userMock, email: "invalid_email.com" }),
    });
    const responseBody = await response.json();

    assertEquals(response.status, 400);
    assertEquals(responseBody, {
      message: "Validation Error",
      cause: [{ path: "email", message: "Invalid email" }],
    });
  });

  await t.step("should return error 400 when using weak password", async () => {
    const response = await testServer.request("/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userMock, password: "Weakpassw0rd!" }),
    });
    const responseBody = await response.json();

    assertEquals(response.status, 400);
    assertEquals(responseBody, { message: "Weak Password" });
  });

  await t.step("should return user info when everything is ok", async () => {
    const response = await testServer.request("/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userMock),
    });
    const responseBody = await response.json();

    assertEquals(response.status, 200);
    assertExists(responseBody.id);
    assertEquals(responseBody.password, undefined);
    assertEquals(responseBody.email, userMock.email);
    assertEquals(responseBody.firstName, userMock.firstName);
    assertEquals(responseBody.lastName, userMock.lastName);
    assertEquals(responseBody.identifier, userMock.identifier);
  });

  await t.step(
    "should return error 400 when using existing email",
    async () => {
      const response = await testServer.request("/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userMock),
      });
      const responseBody = await response.json();

      assertEquals(response.status, 400);
      assertEquals(responseBody, { message: "Bad Request" });
    }
  );

  await t.step(
    "should return error 400 when using existing identifier",
    async () => {
      const response = await testServer.request("/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userMock, email: "another@test.com" }),
      });
      const responseBody = await response.json();

      assertEquals(response.status, 400);
      assertEquals(responseBody, { message: "Bad Request" });
    }
  );

  const databaseClient = context.get("drizzle-client") as DrizzleTestClient;
  await databaseClient.client.close();
});
