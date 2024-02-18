"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon, ReplyIcon, RepeatIcon } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef } from "react";
import { type ResponseData } from "@/app/api/posts/fetch/route";
import LoadingPosts from "@/components/LoadingPosts";

const fetchPosts = async ({ pageParam = 0, limit = 2 }) => {
  try {
    const res = await fetch(
      `/api/posts/fetch?page=${pageParam}&limit=${limit}`
    );
    const data: ResponseData = await res.json();
    return data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

type PostsProps = {
  postsPerLoad: number | undefined;
};

export default function Posts({ postsPerLoad = 5 }: PostsProps) {
  // read: https://react-query.tanstack.com/guides/infinite-queries
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    error,
    isError,
    isLoading,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      return await fetchPosts({ pageParam, limit: postsPerLoad });
    },
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
  });

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage]);

  // read: https://mantine.dev/hooks/use-intersection/
  // used to detect when the last post is in view
  const {} = useIntersection();

  if (isLoading) {
    return <LoadingPosts postCnt={postsPerLoad} />;
  }

  if (isError) {
    return <div className="pt-4 pb-1">Error: {error.message}</div>;
  }

  if (!data) {
    return <div className="pt-4 pb-1">No data</div>;
  }

  const posts = data?.pages?.flatMap((page) => page);

  return (
    <div className="pt-4 pb-1 flex flex-col gap-3">
      {posts.map(({ post, user }, idx) => {
        return (
          <div
            key={post.id}
            ref={idx === posts.length - 1 ? ref : null}
            className="flex items-start gap-3 px-5 pb-2 border-b"
          >
            <Image
              src={user.image ? user.image : "/default-profile-pic.png"}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{user.name}</span>
                <span className="text-gray-500">@{user.username}</span>
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
          </div>
        );
      })}
      {isFetchingNextPage && (posts.length === postsPerLoad) ? (
        <LoadingPosts postCnt={postsPerLoad} />
      ) : null}
    </div>
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
