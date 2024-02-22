import db from "@/lib/db";
import { comment, user, post } from "@/drizzle/out/schema";
import { desc, eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export async function createComment({
  userId,
  postId,
  content,
}: {
  userId: string;
  postId: string;
  content: string;
}) {
  return db.insert(comment).values({
    id: createId(),
    userId,
    postId,
    content,
  });
}

export async function getCommentsByPostId({
  pageParam = 0,
  limit = 5,
  postId,
}: {
  pageParam: number;
  limit: number;
  postId: string;
}) {
  return db
    .select({
      comment: {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
      },
      user: {
        name: user.name,
        username: user.username,
        image: user.image,
      },
    })
    .from(comment)
    .innerJoin(user, eq(comment.userId, user.id))
    .where(eq(comment.postId, postId))
    .orderBy(desc(comment.createdAt))
    .limit(limit)
    .offset(pageParam * limit);
}
