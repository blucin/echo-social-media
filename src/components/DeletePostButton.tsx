"use client";

import { Button } from "@/components/ui/button";
import { Trash2Icon, Loader2Icon } from "lucide-react";
import { handleDeletePost } from "@/actions/post";
import { useTransition } from "react";

export default function DeletePostButton({
  postId,
  className,
}: {
  postId: string;
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          await handleDeletePost(postId);
        });
      }}
      className={className}
      aria-disabled={isPending}
      disabled={isPending}
      variant="link"
    >
      {isPending ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2Icon className="h-4 w-4"/>
      )}
      <span className="sr-only">Delete Post</span>
    </Button>
  );
}
