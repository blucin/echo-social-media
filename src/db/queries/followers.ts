import db from "@/lib/db";
import { follower, notification } from "@/drizzle/out/schema";
import { eq, and } from "drizzle-orm";

export async function getFollowerByUserId({
  userId,
  followerId,
}: {
  userId: string;
  followerId: string;
}) {
  return await db.query.followers.findFirst({
    where: and(
      eq(follower.followeeId, userId),
      eq(follower.followerId, followerId)
    ),
  });
}

export async function createFollower(followerId: string, followeeId: string) {
  return await db.insert(follower).values({
    followerId: followerId,
    followeeId: followeeId,
  });
}

export async function deleteFollower({
  followerId,
  followeeId,
}: {
  followerId: string;
  followeeId: string;
}) {
  // also delete the notifications
  return await db.transaction(async (tx) => {
    await tx.delete(follower).where(
      and(
        eq(follower.followerId, followerId),
        eq(follower.followeeId, followeeId)
      )
    );
    await tx.delete(notification).where(
      and(
        eq(notification.userId, followeeId),
        eq(notification.fromUserId, followerId),
        eq(notification.notificationType, "follow")
      )
    );
  });
}
