import Image from "next/image";
import { cn } from "@/lib/utils";

type CommentProps = {
  authorName: string;
  authorUsername: string;
  authorImage: string | null | undefined;
  content: string;
  className?: string;
};

export default function Comment({ ...props }: CommentProps) {
  return (
    <div className={cn(props.className, "flex items-start gap-3")}>
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
      </div>
    </div>
  );
}
