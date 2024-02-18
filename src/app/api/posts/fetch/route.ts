import { NextResponse, type NextRequest } from "next/server";
import { getPosts } from "@/db/queries/posts";
import { z } from "zod";

const schema = z.object({
  pageParam: z.number(),
  limit: z.number().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const { pageParam, limit } = schema.parse({
      pageParam: Number(searchParams.get("page")),
      limit: Number(searchParams.get("limit")),
    });
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