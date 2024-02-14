import db from "@/lib/db";
import { user } from "@/drizzle/out/schema";
import { eq } from "drizzle-orm";

export async function getUserById(id: string) {
  return db.select().from(user).where(eq(user.id, id));
}
