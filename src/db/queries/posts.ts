import db from "@/lib/db";
import { post, user } from "@/drizzle/out/schema";
import { desc, eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export async function createPost(input: { userId: string; content: string }) {
  return db.insert(post).values({
    id: createId(),
    userId: input.userId,
    content: input.content,
  });
}

export async function getPosts({ pageParam = 0, limit = 5 }) {
  return db
    .select({
      user: {
        name: user.name,
        username: user.username,
        image: user.image
      },
      post: {
        id: post.id,
        content: post.content,
        createdAt: post.createdAt,
      },
    })
    .from(post)
    .innerJoin(user, eq(post.userId, user.id))
    .orderBy(desc(post.createdAt))
    .limit(limit)
    .offset(pageParam * limit);
}
