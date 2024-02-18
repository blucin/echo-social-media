"use server";

import { z } from "zod";

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

export async function createPost(formData: FormData) {
  const validated = formSchema.safeParse({
    postContent: formData.get("postContent"),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten(),
    }
  }
}