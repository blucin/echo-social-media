import { getPostsByUserId } from "@/db/queries/posts";
import Post from "@/components/Post";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function UserPosts({
  userId,
  username,
  page,
  limit,
}: {
  userId: string;
  username: string;
  page: number;
  limit: number;
}) {
  const posts = await getPostsByUserId(userId, page-1, limit);
  if (!posts || posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-5">
        <p className="text-pretty">No posts found</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 mt-4">
      {posts.map((post) => (
        <Post
          key={post.post.id}
          id={post.post.id}
          authorName={post.user.name}
          authorUsername={post.user.username ? post.user.username : "undefined"}
          authorImage={
            post.user.image ? post.user.image : "/default-profile-pic.png"
          }
          content={post.post.content}
        />
      ))}
      <Pagination className="mb-2">
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={{
                  pathname: `/user/${username}`,
                  query: { page: page - 1 },
                }}
              />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink href="#">{page}</PaginationLink>
          </PaginationItem>
          {posts.length === limit && (
            <PaginationItem>
              <PaginationNext
                href={{
                  pathname: `/user/${username}`,
                  query: { page: page + 1 },
                }}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
