import { assertEquals, assertExists } from "@std/assert";
import { context } from "@src/context.ts";
import { initializeMainContext } from "../../contexts/main.context.ts";
import { UserEntity } from "../../1-entities/user.entity.ts";
import { createTestServer } from "../create-test-server.ts";
import { DrizzleClient } from "../../database/drizzle/drizzle.ts";

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

  await t.step(
    "should return error 400 when wrong body is passed",
    async () => {
      const response = await testServer.request("/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ test: "test" }),
      });
      const responseBody = await response.json();

      assertEquals(response.status, 400);
      assertEquals(responseBody, {
        message: "Bad Request",
      });
    },
  );

  const userMock = {
    email: "test@test.com",
    firstName: "Testerson",
    lastName: "Testhonson",
    identifier: "123",
    password: "testing123#",
  } as UserEntity;

  await t.step("should return user info when everything is ok", async () => {
    const response = await testServer.request("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    "should return error 400 when using existant email",
    async () => {
      const response = await testServer.request("/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userMock),
      });
      const responseBody = await response.json();

      assertEquals(response.status, 400);
      assertEquals(responseBody, { message: "Bad Request" });
    },
  );

  await t.step(
    "should return error 400 when using existant identifier",
    async () => {
      const response = await testServer.request("/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userMock, email: "another@test.com" }),
      });
      const responseBody = await response.json();

      assertEquals(response.status, 400);
      assertEquals(responseBody, { message: "Bad Request" });
    },
  );

  const databaseClient = context.get("drizzle-client") as DrizzleClient;
  await databaseClient.client.end({ timeout: 5 });
});
