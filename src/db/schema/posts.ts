import {
  timestamp,
  pgTable,
  text,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const posts = pgTable("post", {
  id: text("id").notNull().primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});