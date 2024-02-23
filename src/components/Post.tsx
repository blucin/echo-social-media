import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon, ReplyIcon, RepeatIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type PostProps = {
  id: string;
  content: string;
  authorName: string | null | undefined;
  authorUsername: string;
  authorImage: string | null | undefined;
  className?: string;
};

export default function Post({ ...props }: PostProps) {
  return (
    <div
      key={props.id}
      className={cn(
        props.className,
        "flex items-start gap-3 px-5 pb-2 border-b"
      )}
    >
      <Image
        src={props.authorImage ? props.authorImage : "/default-profile-pic.png"}
        alt="avatar"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex-1">
        <Link
          href={`/user/${props.authorUsername}/`}
          className="flex items-center gap-2 w-fit"
        >
          <span className="font-semibold hover:underline">
            {props.authorName ? props.authorName : props.authorUsername}
          </span>
          <span className="text-gray-500 hover:underline">
            @{props.authorUsername}
          </span>
        </Link>
        <p className="mt-2 text-pretty">{props.content}</p>
        <div className="mt-2 flex items-center gap-2">
          <Button className="flex gap-1 items-center" variant="ghost">
            <HeartIcon className="h-4 w-4" />
            <span className="sr-only">Like</span>
            <span className="text-xs"> 0 </span>
          </Button>

          <Button variant="ghost">
            <Link
              className="flex gap-1 items-center"
              href={`/post/${props.id}`}
            >
              <ReplyIcon className="h-4 w-4" />
              <span className="sr-only">Comment</span>
              <span className="text-xs"> 69 </span>
            </Link>
          </Button>

          <Button size="icon" variant="ghost">
            <RepeatIcon className="h-4 w-4" />
            <span className="sr-only">Retweet</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
