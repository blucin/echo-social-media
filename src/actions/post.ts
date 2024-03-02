"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { createPost, getPostById, deletePost } from "@/db/queries/posts";
import { revalidatePath } from "next/cache";
import { PostFormSchema as formSchema } from "@/schemas/form-schemas";

// sorry for 2 tabs of indentation whoevers reading this
export async function handleCreatePost(
  data: z.infer<typeof formSchema>,
) {
  const session = await auth();
  if (!session) {
    return {
      message: "error",
      error: "You must be logged in to post",
    };
  }
  try {
    const validated = formSchema.parse(data);
    await createPost({
      userId: session.user.id,
      content: validated.postContent,
      imageUrl: validated.postImageUrl,
    });
    return {
      message: "success",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMap = error.flatten().fieldErrors;
      return {
        message: "error",
        error: errorMap["postContent"]?.[0] ?? "An error occurred",
      };
    } else {
      return {
        message: "error",
        error: "An error occurred",
      };
    }
  }
}

export async function handleDeletePost(postId: string) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("You must be logged in to delete a post");
    }
    const toDelete = await getPostById(postId);
    if (!toDelete || toDelete[0].user.id !== session.user.id) {
      throw new Error("You can only delete your own posts");
    }
    await deletePost(postId);
    revalidatePath("/(main-routes)/user/[username]/", "page");
  } catch (error) {
    return {
      message: "error",
      error: error,
    };
  }
}
