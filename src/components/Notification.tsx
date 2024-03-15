import AcceptFollowButton from "@/components/AcceptFollowButton";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotificationCard({
  ...props
}: {
  notifId: string;
  notifType: "comment" | "like" | "follow";
  hasRead: boolean;
  fromUser: {
    username: string;
  };
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between p-5 border-b", props.className)}>
      {props.notifType === "follow" && props.hasRead === false && (
        <>
          <p className="text-pretty text-base">
            <Link
              href={`/user/${props.fromUser.username}`}
              className="font-bold underline"
            >
              @{props.fromUser.username}
            </Link>{" "}
            wants to follow you.
          </p>
          <AcceptFollowButton notifId={props.notifId} />
        </>
      )}
      {props.notifType === "follow" && props.hasRead === true && (
        <p className="text-pretty text-base">
          <Link
            href={`/user/${props.fromUser.username}`}
            className="font-bold underline"
          >
            @{props.fromUser.username}
          </Link>{" "}
          followed you.
        </p>
      )}
      {props.notifType !== "follow" && (
        <p> did something else. (TODO: handle)</p>
      )}
    </div>
  );
}
