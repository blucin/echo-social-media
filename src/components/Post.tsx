import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon, ReplyIcon, RepeatIcon } from "lucide-react";

type PostProps = {
  id: string;
  content: string;
  authorName: string;
  authorUsername: string;
  authorImage: string | null | undefined;
};

export default function Post({ ...props }: PostProps) {
  return (
    <div key={props.id} className="flex items-start gap-3 px-5 pb-2 border-b">
      <Image
        src={props.authorImage ? props.authorImage : "/default-profile-pic.png"}
        alt="avatar"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{props.authorName}</span>
          <span className="text-gray-500">@{props.authorUsername}</span>
        </div>
        <p className="mt-2 text-pretty">{props.content}</p>
        <div className="mt-2 flex items-center gap-2">
          <Button className="flex gap-1 items-center" variant="ghost">
            <HeartIcon className="h-4 w-4" />
            <span className="sr-only">Like</span>
            <span className="text-xs"> 0 </span>
          </Button>

          <Button className="flex gap-1 items-center" variant="ghost">
            <ReplyIcon className="h-4 w-4" />
            <span className="sr-only">Comment</span>
            <span className="text-xs"> 69 </span>
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
