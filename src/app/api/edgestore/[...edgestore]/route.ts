import { initEdgeStore } from "@edgestore/server";
import {
  type CreateContextOptions,
  createEdgeStoreNextHandler,
} from "@edgestore/server/adapters/next/app";
import { auth } from "@/auth";
import { z } from "zod";

type Context = {
  userId: string | undefined;
};

async function createContext({ req }: CreateContextOptions): Promise<Context> {
  const session = await auth();
  if (!session) {
    return {
      userId: undefined,
    };
  }
  return {
    userId: session.user.id,
  };
}

const es = initEdgeStore.context<Context>().create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicImage: es
    .imageBucket({
      maxSize: 1024 * 1024 * 2,
      accept: ["image/png", "image/jpeg", "image/jpg"],
    })
    // this input will be required for every upload request
    .input(
      z.object({
        category: z.string(),
      })
    )
    // publicImages/{category}/{author}
    .path(({ ctx, input }) => [
      { category: input.category },
      { author: ctx.userId },
    ])
    /**
     * return `true` to allow upload
     * By default every upload from your app is allowed.
     */
    .beforeUpload(({ ctx, input, fileInfo }) => {
      if (!ctx.userId) {
        return false;
      }
      return true; // Allow the upload
    })
    /**
     * return `true` to allow delete
     * This function must be defined if you want to delete files directly from the client.
     */
    .beforeDelete(({ ctx, fileInfo }) => {
      if (ctx.userId !== fileInfo.path.author) {
        return false;
      }
      return true;
    }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext,
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
