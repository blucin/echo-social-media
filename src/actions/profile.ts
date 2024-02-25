"use server";

import { redirect } from "next/navigation";

import db from "@/lib/db";
import { user } from "@/drizzle/out/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// used to create a profile for the first time
export const createProfile = async (data: {
  username: string;
  bio: string | undefined;
}) => {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  const existingUser = await db
    .select()
    .from(user)
    .where(eq(user.username, data.username));

  if (existingUser.length > 0) {
    return { error: "Username already exists" };
  }

  const res = await db
    .update(user)
    .set({ username: data.username, bio: data.bio })
    .where(eq(user.id, session.user.id))
    .returning({ username: user.username, bio: user.bio });

  if (res.length === 0) {
    return { error: "Failed to create profile" };
  }

  if (!res || res[0].username == null) {
    return { error: "Failed to create profile" };
  }

  redirect("/home");
};

// used to update a profile
const updateProfileSchema = z.object({
  username: z.string().optional(),
  bio: z.string().optional(),
  bannerImage: z.string().optional(),
  image: z.string().optional(),
  isPrivate: z.boolean().optional(),
});
export const updateProfile = async (data: any) => {
  try {
    const session = await auth();
    if (!session) {
      redirect("/signin");
    }
    const validateData = updateProfileSchema.parse(data);
    const res = await db
      .update(user)
      .set(validateData)
      .where(eq(user.id, session.user.id))
      .returning({ username: user.username });

    if (res.length === 0) {
      return { error: "Failed to update profile" };
    }
    if (!res || res[0].username == null) {
      return { error: "Failed to update profile" };
    }
    revalidatePath("/profile");
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message ===
        'duplicate key value violates unique constraint "user_username_unique"'
      ) {
        return { error: "Username already exists" };
      }
      return { error: error.message };
    } else {
      return { error: "An unknown error occurred" };
    }
  }
};
