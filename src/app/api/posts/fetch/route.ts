import { NextResponse, type NextRequest } from "next/server";
import { getPosts, getFollowingPosts } from "@/db/queries/posts";
import { z } from "zod";
import { auth } from "@/auth";

const schema = z.object({
  pageParam: z.number(),
  limit: z.number().optional(),
  followingOnly: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const { pageParam, limit, followingOnly } = schema.parse({
      pageParam: Number(searchParams.get("page")),
      limit: Number(searchParams.get("limit")),
      followingOnly: searchParams.get("followingOnly") === "true",
    });
    if (followingOnly) {
      const session = await auth();
      if (!session) {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }
      const data = await getFollowingPosts({pageParam, limit, userId: session.user.id});
      return NextResponse.json(data, { status: 200 });
    }
    const data = await getPosts({ pageParam, limit });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}

export type ResponseData = ReturnType<typeof getPosts>;