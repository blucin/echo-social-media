"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon, ReplyIcon, RepeatIcon } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { type ResponseData } from "@/app/api/posts/fetch/route";

const fetchPosts = async ({ pageParam = 0, limit = 2 }) => {
  try {
    const res = await fetch(`/api/posts/fetch?page=${pageParam}&limit=${limit}`);
    const data: ResponseData = await res.json();
    return data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export default function Posts() {
  const postsPerLoad = 5;
  const { data, fetchNextPage, isFetchingNextPage, error, isError, isLoading } =
    useInfiniteQuery({
      queryKey: ["posts"],
      initialPageParam: 0,
      queryFn: async ({ pageParam = 0 }) => {
        return await fetchPosts({ pageParam, limit: postsPerLoad });
      },
      getNextPageParam: (_, allPages) => {
        return allPages.length + 1;
      },
    });

  if (isLoading) {
    return <div className="pt-4 pb-1">Loading...</div>;
  }

  if (isError) {
    return <div className="pt-4 pb-1">Error: {error.message}</div>;
  }

  if (!data) {
    return <div className="pt-4 pb-1">No data</div>;
  }

  console.log(data.pages)

  return (
    <>
      {data.pages.map((page, i) => (
        <div key={i} className="pt-4 pb-1 flex flex-col gap-3">
          {page.map((post) => (
            <div key={post.id} className="px-5 flex-1 border-b">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Username</span>
                <span className="text-gray-500">@username</span>
              </div>
              <p className="mt-2 text-pretty">{post.content}</p>
              <div className="mt-2 flex items-center gap-2">
                <Button className="flex gap-1 items-center" variant="ghost">
                  <HeartIcon className="h-4 w-4" />
                  <span className="sr-only">Like</span>
                  <span className="text-xs"> 0 </span>
                </Button>

                <Button className="flex gap-1 items-center" variant="ghost">
                  <ReplyIcon className="h-4 w-4" />
                  <span className="sr-only">Comment</span>
                  <span className="text-xs"> 69 </span>
                </Button>

                <Button size="icon" variant="ghost">
                  <RepeatIcon className="h-4 w-4" />
                  <span className="sr-only">Retweet</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ))}

      <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
        {isFetchingNextPage ? "Loading more..." : "Load more"}
      </Button>
    </>
  );
}

/*
{data.pages.map((page, i) => (
        <div key={i} className="pt-4 pb-1 flex flex-col gap-3">
          {page.map((post) => (
            <div key={post.id} className="px-5 flex-1 border-b">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Username</span>
                <span className="text-gray-500">@{post.handle}</span>
              </div>
              <p className="mt-2 text-pretty">{post.content}</p>
              <div className="mt-2 flex items-center gap-2">
                <Button className="flex gap-1 items-center" variant="ghost">
                  <HeartIcon className="h-4 w-4" />
                  <span className="sr-only">Like</span>
                  <span className="text-xs"> {post.likes} </span>
                </Button>

                <Button className="flex gap-1 items-center" variant="ghost">
                  <ReplyIcon className="h-4 w-4" />
                  <span className="sr-only">Comment</span>
                  <span className="text-xs"> {post.comments} </span>
                </Button>

                <Button size="icon" variant="ghost">
                  <RepeatIcon className="h-4 w-4" />
                  <span className="sr-only">Retweet</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ))}
*/