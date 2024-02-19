"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { createPost } from "@/db/queries/posts";

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
    const zodError = error as z.ZodError;
    const errorMap = zodError.flatten().fieldErrors;
    return {
      message: "error",
      error: errorMap["postContent"]?.[0] ?? "An error occurred",
      postContent: postContent as string,
    };
  }
}
