import type { Config } from "drizzle-kit";

export default {
  driver: "pg",
  schema: "./src/db/schema/*",
  out: "./src/drizzle/out",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  }
} satisfies Config;