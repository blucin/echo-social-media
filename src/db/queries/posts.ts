import db from "@/lib/db";
import { post, user, follower, comment } from "@/drizzle/out/schema";
import { desc, eq, and, count, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export async function createPost(input: { userId: string; content: string }) {
  return db.insert(post).values({
    id: createId(),
    userId: input.userId,
    content: input.content,
  });
}

export async function getPosts({ pageParam = 0, limit = 5 }) {
  const commentsCntSubQuery = db
    .select({
      postId: comment.postId,
      commentsCnt: sql<number>`count(*)`.as('comments_count'), 
    })
    .from(comment)
    .groupBy(comment.postId)
    .as('commentsCntSubQuery');
  return db
    .select({
      user: {
        name: user.name,
        username: user.username,
        image: user.image,
      },
      post: {
        id: post.id,
        content: post.content,
        createdAt: post.createdAt,
      },
      commentsCount: commentsCntSubQuery.commentsCnt,
    })
    .from(post)
    .innerJoin(user, eq(post.userId, user.id))
    .leftJoin(commentsCntSubQuery, eq(post.id, commentsCntSubQuery.postId))
    .where(eq(user.isPrivate, false))
    .orderBy(desc(post.createdAt))
    .limit(limit)
    .offset(pageParam * limit);
}

export async function getFollowingPosts({
  pageParam = 0,
  limit = 5,
  userId,
}: {
  pageParam: number;
  limit: number | undefined;
  userId: string;
}) {
  return db
    .select({
      user: {
        name: user.name,
        username: user.username,
        image: user.image,
      },
      post: {
        id: post.id,
        content: post.content,
        createdAt: post.createdAt,
      },
    })
    .from(post)
    .innerJoin(user, eq(post.userId, user.id))
    .innerJoin(follower, and(eq(follower.followerId, userId), eq(follower.followeeId, post.userId)))
    .orderBy(desc(post.createdAt))
    .limit(limit)
    .offset(pageParam * limit);
}

export async function getPostById(id: string) {
  return db
    .select({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        image: user.image,
      },
      post: {
        id: post.id,
        content: post.content,
        createdAt: post.createdAt,
      },
    })
    .from(post)
    .innerJoin(user, eq(post.userId, user.id))
    .where(eq(post.id, id));
}

export async function getPostsByUserId(
  userId: string,
  pageParam: number,
  limit: number
) {
  return db
    .select({
      user: {
        name: user.name,
        username: user.username,
        image: user.image,
      },
      post: {
        id: post.id,
        content: post.content,
        createdAt: post.createdAt,
      },
    })
    .from(post)
    .innerJoin(user, eq(post.userId, user.id))
    .where(eq(post.userId, userId))
    .orderBy(desc(post.createdAt))
    .limit(limit)
    .offset(pageParam * limit);
}

export async function deletePost(id: string) {
  return db.delete(post).where(eq(post.id, id));
}
