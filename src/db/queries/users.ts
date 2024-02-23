import db from "@/lib/db";
import { eq } from "drizzle-orm";
import { user } from "@/drizzle/out/schema";

export async function getUserById(id: string) {
  return db.query.users.findFirst({
    columns: {
      id: true,
      name: true,
      username: true,
      bio: true,
      image: true,
      bannerImage: true,
    },
    where: eq(user.id, id),
  });
}

export async function getUserByUsername(username: string) {
  return db.query.users.findFirst({
    columns: {
      id: true,
      name: true,
      username: true,
      bio: true,
      image: true,
      bannerImage: true,
    },
    where: eq(user.username, username),
  });
}
