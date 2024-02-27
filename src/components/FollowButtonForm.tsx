import { getPendingFollowingNotif } from "@/db/queries/notifications";
import { getFollowerByUserId } from "@/db/queries/followers";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { FollowButton, UnfollowButton } from "@/components/FollowUnfollowButton";

type FollowButtonFormProps = {
  followerId: string;
  followeeId: string;
  className?: string;
};

/**
 * Follow button form
 * @param followerId - the id of the follower
 * @param followeeId - the id of the followee
 * @returns - the follow button form
 * @example
 * <FollowButtonForm followerId="1" followeeId="2" />
 * @description
 * This component is used to show the follow button form.
 * It has three states:
 * 1. Pending follow request
 * 2. First time following, show follow button
 * 3. Already following, show unfollow button
 */
export default async function FollowButtonForm({
  ...props
}: FollowButtonFormProps) {
  if (props.followerId === props.followeeId) {
    return null;
  }

  const alreadyFollowing = await getFollowerByUserId({
    userId: props.followeeId,
    followerId: props.followerId,
  });
  
  if (alreadyFollowing) {
    return (
      <UnfollowButton
        followeeId={props.followeeId}
        className={props.className}
      />
    );
  }

  // Check pending
  const pending = await getPendingFollowingNotif(
    props.followerId,
    props.followeeId
  );

  if (pending) {
    return (
      <Button disabled className={cn("text-base px-5", props.className)}>
        <Loader2Icon className="h-4 w-4 animate-spin mr-2" />
        Pending ...
      </Button>
    );
  }
  
  return (
    <FollowButton
      followeeId={props.followeeId}
      className={props.className}
    />
  );
}
