import { Context } from "@dest/context.ts";
import { GenericRepositorySpy } from "@src/__tests__/_stubs/repository.stub.ts";

export function initializeUnitTestsContext(context: Context) {
  context.bind("user-repository", GenericRepositorySpy);
}
