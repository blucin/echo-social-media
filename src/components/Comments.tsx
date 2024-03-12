"use client";

import { cn } from "@/lib/utils";
import Comment from "@/components/Comment";
import CommentForm from "@/components/CommentForm";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingPosts from "@/components/LoadingPosts";
import { XCircleIcon } from "lucide-react";
import { type ResponseData } from "@/app/api/comments/fetch/route";

const fetchComments = async ({ pageParam = 0, limit = 2, postId }: {
  pageParam: number;
  limit: number;
  postId: string;
}) => {
  try {
    const res = await fetch(
      `/api/comments/fetch?page=${pageParam}&limit=${limit}&postId=${postId}`
    );
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const data: ResponseData = await res.json();
    return data;
  } catch (error) {
    throw new Error("some error occurred while fetching comments.");
  }
}

export default function Comments({ ... props }: {
  postId: string;
  className?: string;
}) {
  // read: https://react-query.tanstack.com/guides/infinite-queries
  const { data, fetchNextPage, error, isError, isLoading, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["comments"],
      initialPageParam: 0,
      queryFn: async ({ pageParam = 0 }) => {
        return await fetchComments({ pageParam, limit: 5, postId: props.postId });
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < 5) {
          return undefined;
        }
        return allPages.length;
      },
    });
  
  if (isLoading) {
    return <LoadingPosts postCnt={5} />;
  }

  if (!data || error) {
    return (
      <div className="flex gap-2 py-5 bg-destructive justify-center text-white dark:text-red-500">
        <XCircleIcon className="h-6 w-6" />
        <span>Error: {error ? error.message: "No comment contents found"}</span>
      </div>
    );
  }

  const comments = data?.pages?.flatMap((page) => page);

  return(
    <div className={cn(props.className, "flex flex-col gap-3")}>
      <CommentForm postId={props.postId} />
      <InfiniteScroll
        dataLength={comments ? comments.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<LoadingPosts postCnt={5} />}
        endMessage={
          <p className="text-center border-b p-3 text-gray-500 dark:text-gray-400">
            No more comments to load
          </p>
        }
      >
        <div className="pt-2 pb-1 flex flex-col gap-3">
          {comments?.map((comment) => (
            <Comment 
              key={comment.comment.id} 
              authorName={comment.user.name ? comment.user.name : ""}
              authorUsername={comment.user.username ? comment.user.username : "unknown"}
              authorImage={comment.user.image}
              content={comment.comment.content}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}