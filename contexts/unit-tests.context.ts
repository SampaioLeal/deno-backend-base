import { Context } from "@dest/context.ts";
import { GenericTestRepository } from "../__tests__/_stubs/repository.stub.ts";

export function initializeUnitTestsContext(context: Context) {
  context.bind("user-repository", GenericTestRepository);
}
