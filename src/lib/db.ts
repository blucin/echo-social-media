import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

// table schemas
import * as userSchema from "@/db/schema/users";
import * as postSchema from "@/db/schema/posts";
import * as commentSchema from "@/db/schema/comments";
import * as followSchema from "@/db/schema/followers";
import * as likeSchema from "@/db/schema/likes";
import * as notificationSchema from "@/db/schema/notifications";

const db = drizzle(sql, {
  schema: {
    ...userSchema,
    ...postSchema,
    ...commentSchema,
    ...followSchema,
    ...likeSchema,
    ...notificationSchema,
  },
});

export default db;
