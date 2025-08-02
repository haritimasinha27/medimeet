import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

// Validate required environment variables
if (!process.env.DATABASE_URL) {
  // Silent validation - no console output
}

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// Test database connection
export async function testDatabaseConnection() {
  try {
    await db.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    return false;
  }
}