"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Post from "@/components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { type ResponseData } from "@/app/api/posts/fetch/route";
import LoadingPosts from "@/components/LoadingPosts";
import { XCircleIcon } from "lucide-react";
import { format } from "date-fns";

const fetchFollowingPosts = async ({ pageParam = 0, limit = 2 }) => {
  try {
    const res = await fetch(
      `/api/posts/fetch?page=${pageParam}&limit=${limit}&followingOnly=true`
    );
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const data: ResponseData = await res.json();
    return data;
  } catch (error) {
    throw new Error("Some error occurred while fetching posts.");
  }
};

const fetchPublicPosts = async ({ pageParam = 0, limit = 2 }) => {
  try {
    const res = await fetch(
      `/api/posts/fetch?page=${pageParam}&limit=${limit}`
    );
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const data: ResponseData = await res.json();
    return data;
  } catch (error) {
    throw new Error("Some error occurred while fetching posts.");
  }
};

type PostsProps = {
  postsPerLoad: number | undefined;
  followingOnly?: boolean;
};

export default function Posts({ postsPerLoad = 5, followingOnly }: PostsProps) {
  // read: https://react-query.tanstack.com/guides/infinite-queries
  const { data, fetchNextPage, error, isError, isLoading, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", followingOnly],
      initialPageParam: 0,
      queryFn: async ({ pageParam = 0 }) => {
        if (followingOnly) {
          return await fetchFollowingPosts({ pageParam, limit: postsPerLoad });
        } else {
          return await fetchPublicPosts({ pageParam, limit: postsPerLoad });
        }
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < postsPerLoad) {
          return undefined;
        }
        return allPages.length;
      },
    });

  if (isLoading) {
    return <LoadingPosts postCnt={postsPerLoad} />;
  }

  if (!data || error) {
    return (
      <div className="flex gap-2 py-5 bg-destructive justify-center text-white dark:text-red-500">
        <XCircleIcon className="h-6 w-6" />
        <span>Error: {error ? error.message : "No post contents found"}</span>
      </div>
    );
  }

  const posts = data?.pages?.flatMap((page) => page);

  return (
    <InfiniteScroll
      dataLength={posts ? posts.length : 0}
      next={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={<LoadingPosts postCnt={postsPerLoad} />}
      endMessage={
        <p className="pt-3 text-center text-pretty text-gray-600 dark:text-gray-300">
          No more posts to show
        </p>
      }
    >
      <div className="pt-4 pb-1 flex flex-col gap-3">
        {posts.map(({ post, user, commentsCount, likesCount }) => {
          return (
            <Post
              key={post.id}
              id={post.id}
              content={post.content}
              authorName={user.name ? user.name : ""}
              authorUsername={user.username ? user.username : "unknown"}
              authorImage={user.image}
              uploadedAt={format(new Date(post.createdAt), "MMM d, y")}
              commentsCnt={commentsCount}
              likesCnt={likesCount}
            />
          );
        })}
      </div>
    </InfiniteScroll>
  );
}
