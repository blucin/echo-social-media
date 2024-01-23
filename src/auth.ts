import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "@/lib/db";
import { getUserById } from "@/db/queries/users";

export const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }: any) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.username && session.user) {
        session.user.username = token.username;
      }
      if (token.bio && session.user) {
        session.user.bio = token.bio;
      }
      if (token.bannerImage && session.user) {
        session.user.bannerImage = token.bannerImage;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.username = existingUser[0].username ?? "";
      token.bio = existingUser[0].bio ?? "";
      token.bannerImage = existingUser[0].bannerImage ?? "";
      
      return token
    }
  }
} satisfies NextAuthConfig;

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
