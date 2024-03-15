import {
  timestamp,
  pgTable,
  text,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const posts = pgTable("post", {
  id: text("id").notNull().primaryKey(),
  content: text("content").notNull(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  postImageUrl: text("postImageUrl").unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});