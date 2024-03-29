"use server";

import { z } from "zod";
import { auth } from "@/auth";
import {
  createNotificationByUserId,
  getNotificationByNotifId,
  markNotificationAsRead,
} from "@/db/queries/notifications";
import { revalidatePath } from "next/cache";

const CreateFollowNotifsSchema = z.object({
  userId: z.string(),
});

export async function handleCreateFollowNotifs(
  data: z.infer<typeof CreateFollowNotifsSchema>
) {
  try {
    const session = await auth();
    if (!session) {
      return {
        message: "error",
        error: "You must be logged in to follow",
      };
    }
    const validated = CreateFollowNotifsSchema.parse(data);
    if (validated.userId === session.user.id) {
      return {
        message: "error",
        error: "You can't follow yourself",
      };
    }
    await createNotificationByUserId(
      validated.userId,
      session.user.id,
      "follow"
    );
    revalidatePath("/(main-routes)");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        message: "error",
        error: "An error occurred",
      };
    }
    if (error instanceof Error) {
      return {
        message: "error",
        error: error.message,
      };
    }
    return {
      message: "error",
      error: "An error occurred",
    };
  }
}

export async function handleMarkNotifsAsRead(notifId: string) {
  try {
    const session = await auth();
    if (!session) {
      return {
        message: "error",
        error: "You must be logged in to mark notifications as read",
      };
    }
    const toMark = await getNotificationByNotifId(notifId);
    if (!toMark) {
      return {
        message: "error",
        error: "Notification not found",
      };
    }
    if (toMark.userId !== session.user.id) {
      return {
        message: "error",
        error: "You can't mark notifications as read for other users",
      };
    }
    await markNotificationAsRead({
      notifId,
      userId: session.user.id,
      notificationType: "follow",
      fromUserId: toMark.fromUserId,
    });
    revalidatePath("/(main-routes)");
  } catch (error) {
    return {
      message: "error",
      error: "An error occurred",
    };
  }
}
