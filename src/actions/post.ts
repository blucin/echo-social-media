"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { createPost, getPostById, deletePost } from "@/db/queries/posts";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  postContent: z
    .string()
    .min(1, "Post can't be empty")
    .max(280, "Post can't be longer than 280 characters")
    .refine((content) => !content.startsWith(" "), {
      message: "Post can't start with a space",
    })
    .refine((content) => content.trim().length > 0, {
      message: "Post can't be just spaces",
    }),
});

type FormState = {
  message: "success" | "error" | "idle";
  postContent: string;
  error?: string;
};

// sorry for 2 tabs of indentation whoevers reading this
export async function handleCreatePost(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const postContent = formData.get("postContent");
  const session = await auth();
  if (!session) {
    return {
      message: "error",
      error: "You must be logged in to post",
      postContent: postContent as string,
    };
  }
  try {
    const validated = formSchema.parse({
      postContent,
    });
    await createPost({
      userId: session.user.id,
      content: validated.postContent,
    });
    return {
      message: "success",
      postContent: "",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMap = error.flatten().fieldErrors;
      return {
        message: "error",
        error: errorMap["postContent"]?.[0] ?? "An error occurred",
        postContent: postContent as string,
      };
    } else {
      return {
        message: "error",
        error: "An error occurred",
        postContent: postContent as string,
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
