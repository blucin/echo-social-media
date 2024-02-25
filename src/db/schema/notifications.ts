import { pgTable, pgEnum, text } from "drizzle-orm/pg-core";
import { users } from "./users";

export const notificationTypesEnum = pgEnum("notificationType", [
  "follow",
  "like",
  "comment",
]);

export const notifications = pgTable("notification", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: notificationTypesEnum("notificationType").notNull(),
});
