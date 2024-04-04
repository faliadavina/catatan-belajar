import { PrismaClient } from "@prisma/client";

// @ts-ignore
BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

const prisma = new PrismaClient();

export default prisma;
