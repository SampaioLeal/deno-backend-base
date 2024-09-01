import { assertSpyCalls, stub } from "@std/testing/mock";
import { assertEquals, assertInstanceOf, assertRejects } from "@std/assert";
import { UserEntity } from "../../1-entities/user.entity.ts";
import { createUser } from "../../4-use-cases/user.usecase.ts";
import { initializeUnitTestsContext } from "../../contexts/unit-tests.context.ts";
import { context } from "../../utils/context.ts";
import { ValidationError } from "@dest/errors/validation.error.ts";
import { GenericTestRepository } from "../_stubs/repository.stub.ts";

Deno.test("Users Unit - createUser usecase", async (t) => {
  const validData: UserEntity = {
    firstName: "John",
    lastName: "Doe",
    identifier: "12345678",
    email: "johndoe@example.com",
    password: "mysecretpassword",
  };

  await t.step(
    "should throw error when repository does not exist",
    async () => {
      const error = await assertRejects(
        async () => await createUser(validData)
      );

      assertInstanceOf(error, Error);
      assertEquals(error.message, "Identifier user-repository not bound");
    }
  );

  initializeUnitTestsContext(context);

  await t.step("should create a user with valid data", async () => {
    using userRepositoryStub = stub(GenericTestRepository, "create", GenericTestRepository.create);
    const createdUser = await createUser(validData);

    assertSpyCalls(userRepositoryStub, 1);
    assertEquals(Object.hasOwn(createdUser, "id"), true);
    assertEquals(Object.hasOwn(createdUser, "password"), false);
    assertEquals(createdUser.firstName, validData.firstName);
    assertEquals(createdUser.lastName, validData.lastName);
    assertEquals(createdUser.identifier, validData.identifier);
    assertEquals(createdUser.email, validData.email);
  });

  await t.step("should throw an error when user data is invalid", async () => {
    using userRepositoryStub = stub(GenericTestRepository, "create", () => ({} as UserEntity));
    const error = await assertRejects(
      async () => await createUser({
        ...validData,
        firstName: null,
      } as unknown as UserEntity)
    );

    assertSpyCalls(userRepositoryStub, 0);
    assertInstanceOf(error, ValidationError);
  });

});
