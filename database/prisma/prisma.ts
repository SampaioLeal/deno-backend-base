import { type PrismaClient } from "./generated/deno/index.d.ts";

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const Prisma = require("./generated/index.js");

export function createPrismaClient() {
  return new Prisma.PrismaClient() as PrismaClient;
}
