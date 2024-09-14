import { hash, verify } from "@felix/argon2";
import { HashPasswordService } from "../../3-services/hash-password.service.ts";

function hashPassword(password: string): Promise<string> {
  return hash(password);
}

function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return verify(hashedPassword, password);
}

export const HashPasswordArgon2Service: HashPasswordService = {
  hash: hashPassword,
  verify: verifyPassword,
};
