import db from "@/lib/db";
import {
  notification,
  user,
  follower,
  notificationType,
} from "@/drizzle/out/schema";
import { eq, and } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export async function getNotifsByUserId(userId: string) {
  return await db
    .select({
      fromUser: {
        name: user.name,
        username: user.username,
      },
      notifId: notification.id,
      fromUserId: notification.fromUserId,
      notifType: notification.notificationType,
      hasRead: notification.hasRead,
    })
    .from(notification)
    .where(eq(notification.userId, userId))
    .innerJoin(user, eq(notification.fromUserId, user.id));
}

export async function getPendingFollowingNotif(
  followerId: string,
  followeeId: string
) {
  return await db.query.notifications.findFirst({
    where: and(
      eq(notification.userId, followeeId),
      eq(notification.fromUserId, followerId),
      eq(notification.notificationType, "follow")
    ),
  });
}

export async function createNotificationByUserId(
  userId: string,
  fromUserId: string,
  type: "comment" | "like" | "follow"
) {
  return await db.insert(notification).values({
    id: createId(),
    userId: userId,
    fromUserId: fromUserId,
    notificationType: type,
    hasRead: false,
  });
}

export async function getNotificationByNotifId(notifId: string) {
  return await db.query.notifications.findFirst({
    where: eq(notification.id, notifId),
  });
}

export async function markNotificationAsRead({
  notifId,
  userId,
  notificationType,
  fromUserId,
}:
  | {
      notifId: string;
      userId: string;
      notificationType: "follow";
      fromUserId: string;
    }
  | {
      notifId: string;
      userId: undefined;
      notificationType: "comment" | "like";
      fromUserId: undefined;
    }) {
  if (notificationType !== "follow") {
    return await db
      .update(notification)
      .set({ hasRead: true })
      .where(eq(notification.id, notifId));
  }
  return await db.transaction(async (tx) => {
    await tx
      .update(notification)
      .set({ hasRead: true })
      .where(eq(notification.id, notifId));
    await tx
      .insert(follower)
      .values({ followeeId: userId, followerId: fromUserId });
  });
}
