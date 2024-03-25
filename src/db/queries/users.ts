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
      isPrivate: true,
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
      isPrivate: true,
    },
    where: eq(user.username, username),
  });
}

export async function getNUsers(n: number) {
  return db
    .select({
      username: user.username,
      displayName: user.name,
      profilePic: user.image,
    })
    .from(user)
    .limit(n);
}
