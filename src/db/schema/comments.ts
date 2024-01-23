import {
  timestamp,
  pgTable,
  text,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { posts } from "./posts";

export const comments = pgTable("comment", {
  id: text("id").notNull().primaryKey(),
  content: text("content").notNull(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  postId: text("postId").notNull().references(() => posts.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});