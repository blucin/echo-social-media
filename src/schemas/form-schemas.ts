import { z } from "zod";

// Profile Form Schema
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
});

// Settings Form Schema
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png"];
const ImageSchema = z
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
        (file) => {
          if (file instanceof File) {
            return ACCEPTED_IMAGE_TYPES.includes(file.type.split("/")[1]);
          } else if (file instanceof FileList) {
            return Array.from(file).every(f => ACCEPTED_IMAGE_TYPES.includes(f.type.split("/")[1]));
          }
          return false;
        },
        "File type must be one of .jpeg, .jpg, .png"
      )
      .refine(
        (file) => {
          if (file instanceof File) {
            return file.size <= MAX_FILE_SIZE;
          } else if (file instanceof FileList) {
            return Array.from(file).every(f => f.size <= MAX_FILE_SIZE);
          }
          return false;
        },
        "File size must not exceed the maximum file size."
      ),
  ])
  .optional();
export const SettingsPageFormSchema = ProfileFormSchema.extend({
  displayName: z
    .string()
    .min(3)
    .max(50)
    .refine((name) => /^[a-zA-Z0-9_ ]+$/.test(name), {
      message: "Name can only contain letters, numbers, and spaces",
    }),
  bannerImage: ImageSchema,
  image: ImageSchema,
  isPrivate: z.boolean().optional(),
});

// Post Form Schema
export const PostFormSchema = z.object({
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
  postImageUrl: z
    .string()
    .url({ message: "Post ImageURL is not a valid URL" })
    .optional(),
});
