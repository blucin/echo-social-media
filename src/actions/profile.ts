"use server";

import { redirect } from 'next/navigation'

import db from "@/lib/db";
import { user } from "@/drizzle/out/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";

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
