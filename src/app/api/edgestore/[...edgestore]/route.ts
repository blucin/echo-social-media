import { handler, EdgeStoreRouter } from '@/lib/edgestore-server';

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type { EdgeStoreRouter };
