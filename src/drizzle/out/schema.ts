import { pgTable, foreignKey, pgEnum, text, timestamp, unique, boolean, primaryKey, integer } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const notificationType = pgEnum("notificationType", ['comment', 'like', 'follow'])


export const session = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
});

export const user = pgTable("user", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: 'string' }),
	image: text("image"),
	username: text("username"),
	bio: text("bio"),
	bannerImage: text("bannerImage"),
	isPrivate: boolean("isPrivate").default(false).notNull(),
},
(table) => {
	return {
		userUsernameUnique: unique("user_username_unique").on(table.username),
	}
});

export const notification = pgTable("notification", {
	id: text("id").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	notificationType: notificationType("notificationType").notNull(),
	fromUserId: text("fromUserId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	hasRead: boolean("hasRead").default(false).notNull(),
});

export const comment = pgTable("comment", {
	id: text("id").primaryKey().notNull(),
	content: text("content").notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	postId: text("postId").notNull().references(() => post.id, { onDelete: "cascade" } ),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }).defaultNow(),
});

export const post = pgTable("post", {
	id: text("id").primaryKey().notNull(),
	content: text("content").notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }).defaultNow(),
});

export const follower = pgTable("follower", {
	followerId: text("followerId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	followeeId: text("followeeId").notNull().references(() => user.id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		followerFollowerIdFolloweeIdPk: primaryKey({ columns: [table.followerId, table.followeeId], name: "follower_followerId_followeeId_pk"})
	}
});

export const like = pgTable("like", {
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	postId: text("postId").notNull().references(() => post.id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		likeUserIdPostIdPk: primaryKey({ columns: [table.userId, table.postId], name: "like_userId_postId_pk"})
	}
});

export const verificationToken = pgTable("verificationToken", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		verificationTokenIdentifierTokenPk: primaryKey({ columns: [table.identifier, table.token], name: "verificationToken_identifier_token_pk"})
	}
});

export const account = pgTable("account", {
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text("scope"),
	idToken: text("id_token"),
	sessionState: text("session_state"),
},
(table) => {
	return {
		accountProviderProviderAccountIdPk: primaryKey({ columns: [table.provider, table.providerAccountId], name: "account_provider_providerAccountId_pk"})
	}
});