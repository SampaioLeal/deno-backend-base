import { context } from "../../utils/context.ts";
import { UserEntity } from "@src/1-entities/user.entity.ts";
import { createUser } from "@src/4-use-cases/user.usecase.ts";
import { assertEquals } from "@std/assert";
import { initializeUnitTestsContext } from "@src/contexts/unit-tests.context.ts";
import { GenericRepositorySpy } from "@src/__tests__/_stubs/repository.stub.ts";
import { assertSpyCalls } from "@std/testing/mock";

initializeUnitTestsContext(context);

Deno.test("Users Unit - createUser usecase", async (t) => {
  const userRepository = context.get("user-repository") as GenericRepositorySpy;

  const validData: UserEntity = {
    firstName: "John",
    lastName: "Doe",
    identifier: "12345678",
    email: "johndoe@example.com",
    password: "mysecretpassword",
  };

  await t.step("should create a user with valid data", async () => {
    const createdUser = await createUser(validData);

    assertEquals(createdUser.firstName, validData.firstName);
    assertEquals(createdUser.lastName, validData.lastName);
    assertEquals(createdUser.identifier, validData.identifier);
    assertEquals(createdUser.email, validData.email);
    assertEquals(createdUser.password, validData.password);

    assertSpyCalls(userRepository.create, 1);
  });
});
