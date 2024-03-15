import {
  pgTable,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { posts } from "./posts";

export const likes = pgTable("like", {
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  postId: text("postId").notNull().references(() => posts.id, { onDelete: "cascade" }),
}, (like) => ({
  compoundKey: primaryKey({
    columns: [like.userId, like.postId],
  }),
}));