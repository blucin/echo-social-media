import { z } from "zod";

// profile form schema
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png"];
export const ProfileFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .refine(
      (username) => {
        if (username.length > 20) {
          return "Username must be at most 20 characters long";
        }
        return /^[a-zA-Z0-9_]+$/.test(username);
      },
      {
        message: "Username can only contain letters, numbers, and underscores",
      }
    ),
  bio: z
    .union([
      z
        .string()
        .length(
          0,
          "Bio needs to contain atleast 4 characters or atmost of 100 characters"
        ),
      z
        .string()
        .min(4)
        .max(
          100,
          "Bio needs to contain atleast 4 characters or atmost of 100 characters"
        ),
    ])
    .optional(),
  thumbnail: z
    .union([
      z.undefined(),
      z
        .any()
        .optional()
        .refine(
          (file) => file instanceof File || file instanceof FileList,
          "Please upload a valid file."
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type.split("/")[1]),
          "File type must be one of .jpeg, .jpg, .png"
        )
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          "File size must not exceed the maximum file size."
        ),
    ])
    .optional(),
});