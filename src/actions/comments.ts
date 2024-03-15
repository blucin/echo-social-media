"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { createComment } from "@/db/queries/comments";

const formSchema = z.object({
  content: z
    .string()
    .min(1, "Comment can't be empty")
    .max(280, "Comment can't be longer than 280 characters")
    .refine((content) => !content.startsWith(" "), {
      message: "Comment can't start with a space",
    })
    .refine((content) => content.trim().length > 0, {
      message: "Comment can't be just spaces",
    }),
});

type FormState = {
  message: "success" | "error" | "idle";
  postId: string;
  content: string;
  error?: string;
};

// sorry for 2 tabs of indentation whoevers reading this
export async function handleCreateComment(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const content = formData.get("content");
  const session = await auth();
  if (!session) {
    return {
      message: "error",
      postId: prevState.postId,
      error: "You must be logged in to comment",
      content: content as string,
    };
  }
  try {
    const validated = formSchema.parse({
      content,
    });
    await createComment({
      userId: session.user.id,
      postId: prevState.postId,
      content: validated.content,
    });
    return {
      message: "success",
      content: "",
      postId: prevState.postId,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMap = error.flatten().fieldErrors;
      return {
        message: "error",
        error: errorMap["content"]?.[0] ?? "An error occurred",
        postId: prevState.postId,
        content: content as string,
      };
    } else {
      return {
        message: "error",
        error: "An error occurred",
        postId: prevState.postId,
        content: content as string,
      };
    }
  }
}
