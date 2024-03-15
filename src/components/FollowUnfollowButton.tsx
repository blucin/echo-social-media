"use client";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { handleCreateFollowNotifs } from "@/actions/notifications";
import { handleDeleteFollower } from "@/actions/followers";
import { cn } from "@/lib/utils";

type ButtonProps = {
  followeeId: string;
  className?: string;
};

export function UnfollowButton({ ...props }: ButtonProps) {
  const [isPending, startTransition] = useTransition();
  const handleSubmit = () => {
    startTransition(async () => {
      await handleDeleteFollower({
        followeeId: props.followeeId,
      });
    });
  };
  return (
    <Button
      onClick={handleSubmit}
      className={cn("text-base px-5", props.className)}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
        </>
      ) : (
        "Unfollow"
      )}
    </Button>
  );
}

export function FollowButton({ ...props }: ButtonProps) {
  const [isPending, startTransition] = useTransition();
  const handleSubmit = () => {
    startTransition(async () => {
      await handleCreateFollowNotifs({
        userId: props.followeeId,
      });
    });
  };
  return (
    <Button
      onClick={handleSubmit}
      className={cn("text-base px-5", props.className)}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
        </>
      ) : (
        "Follow"
      )}
    </Button>
  );
}
