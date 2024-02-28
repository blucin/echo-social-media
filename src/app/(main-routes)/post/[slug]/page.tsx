import Post from "@/components/Post";
import { getPostById } from "@/db/queries/posts";
import { XCircleIcon } from "lucide-react";
import Comments from "@/components/Comments";
import { format } from "date-fns";

export default async function PostDetails({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostById(params.slug);
  if (!post || !post.length || post[0].user.username === null) {
    return (
      <main className="flex items-center justify-center h-full">
        <div className=" text-red-500 flex flex-col items-center gap-4">
          <XCircleIcon className="h-12 w-12" />
          <p className="text-pretty">Post not found</p>
        </div>
      </main>
    );
  }
  return (
    <main className="pt-5">
      <Post
        id={post[0].post.id}
        authorImage={post[0].user.image}
        authorName={post[0].user.name}
        authorUsername={post[0].user.username}
        content={post[0].post.content}
        uploadedAt={format(new Date(post[0].post.createdAt), "MMM d, y")}
      />
      <Comments postId={post[0].post.id} />
    </main>
  );
}
