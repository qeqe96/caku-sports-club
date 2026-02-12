import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getConnectionString(): string {
  const url = process.env.DATABASE_URL || "";
  if (url.startsWith("prisma+postgres://")) {
    // Local development with prisma dev
    const apiKey = url.split("api_key=")[1];
    if (apiKey) {
      try {
        const decoded = JSON.parse(Buffer.from(apiKey, "base64").toString());
        // Remove restrictive pool params set by prisma dev
        const dbUrl = new URL(decoded.databaseUrl);
        dbUrl.searchParams.delete("connection_limit");
        dbUrl.searchParams.delete("single_use_connections");
        dbUrl.searchParams.delete("pool_timeout");
        dbUrl.searchParams.delete("socket_timeout");
        return dbUrl.toString();
      } catch {
        return url;
      }
    }
  }
  // Production: direct PostgreSQL URL (Neon)
  return url;
}

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaPg({
    connectionString: getConnectionString(),
    max: 5,
    connectionTimeoutMillis: 10000,
  });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
