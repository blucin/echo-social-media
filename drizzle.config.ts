import type { Config } from "drizzle-kit";

export default {
  driver: "pg",
  schema: "./src/db/schema/*",
  out: "./src/drizzle/out",
  dbCredentials: {
    user: process.env.POSTGRES_USER!,
    host: process.env.POSTGRES_HOST!,
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DATABASE!,
    ssl: true,
  }
} satisfies Config;