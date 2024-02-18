import db from "@/lib/db";
import { post } from "@/drizzle/out/schema";
import { desc } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export async function createPost(input: { userId: string; content: string }) {
  return db.insert(post).values({
    id: createId(),
    userId: input.userId,
    content: input.content,
  });
}

export async function getPosts({ pageParam = 0, limit = 5}) {
  return db.query.posts.findMany({
    limit: limit,
    offset: pageParam * limit,
    orderBy: [desc(post.createdAt)], // newest first
  });
}
