"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { deleteFollower } from "@/db/queries/followers";
import { revalidatePath } from "next/cache";

const DeleteFollowerSchema = z.object({
  followeeId: z.string(),
});

export async function handleDeleteFollower(
  data: z.infer<typeof DeleteFollowerSchema>
) {
  try {
    const session = await auth();
    if (!session) {
      return {
        message: "error",
        error: "You must be logged in to unfollow",
      };
    }
    const validated = DeleteFollowerSchema.parse(data);
    if (validated.followeeId === session.user.id) {
      return {
        message: "error",
        error: "You can't unfollow yourself",
      };
    }
    await deleteFollower({
      followeeId: validated.followeeId,
      followerId: session.user.id,
    });
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