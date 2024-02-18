import { Skeleton } from "./ui/skeleton";

type LoadingPostsProps = {
  postCnt: number;
};

export default function LoadingPosts({ postCnt }: LoadingPostsProps) {
  return (
    <div className="flex flex-col">
      {Array.from({ length: postCnt }, (_, i) => (
        <div key={i} className="flex items-start gap-3 px-5 py-6 border-b">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1">
            <div className="flex gap-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 mt-3" />
            <Skeleton className="h-4 mt-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}