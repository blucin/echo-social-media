import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon, ReplyIcon, RepeatIcon } from "lucide-react";

type PostProps = {
  content: string;
  authorName: string;
  authorImage: string | null | undefined;
  authorHandle: string;
};

export default function Post() {
  return (
    <div className="px-4 pt-4 pb-2 flex items-start gap-3 border-b">
      <Image
        src=""
        alt=""
        className="rounded-full w-10 h-10 bg-gray-200"
        width={10}
        height={10}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Username</span>
          <span className="text-gray-500">@handle</span>
        </div>
        <p className="mt-2 text-pretty">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          nisl id euismod tincidunt, nisl nunc scelerisque nisi, in scelerisque
          nisl nunc id dui. nunc id dui.nunc id dui.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Button className="flex gap-1 items-center" variant="ghost">
            <HeartIcon className="h-4 w-4" />
            <span className="sr-only">Like</span>
            <span className="text-xs"> 400 </span>
          </Button>
          
          <Button className="flex gap-1 items-center" variant="ghost">
            <ReplyIcon className="h-4 w-4" />
            <span className="sr-only">Comment</span>
            <span className="text-xs"> 340 </span>
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
