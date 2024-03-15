import {
  pgTable,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const followers = pgTable("follower", {
  followerId: text("followerId").notNull().references(() => users.id, { onDelete: "cascade" }),
  followeeId: text("followeeId").notNull().references(() => users.id, { onDelete: "cascade" }),
}, (follower) => ({
  compoundKey: primaryKey({
    columns: [follower.followerId, follower.followeeId],
  }),
}));