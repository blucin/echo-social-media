import Image from "next/image";
import { cn } from "@/lib/utils";
import { getNUsers } from "@/db/queries/users";
import Link from "next/link";

function UserCard({
  ...props
}: {
  username: string | null;
  displayName: string | null;
  userPic: string | null;
}) {
  return (
    <Link
      className="flex gap-2 items-center hover:bg-gray-100 rounded-lg cursor-pointer p-2"
      href={`/user/${props.username}`}
    >
      <Image
        src={props.userPic || "/default-profile-pic.png"}
        alt="profile"
        className="rounded-full w-14 h-14 bg-gray-200"
        width={50}
        height={50}
      />
      <div>
        <p className="font-semibold">{props.displayName}</p>
        <p className="text-gray-500">@{props.username}</p>
      </div>
    </Link>
  );
}

// TODO: add right side bar
export default async function RightSideBar({
  className,
}: {
  className?: string;
}) {
  const users = await getNUsers(4);

  if (!users || users.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        className,
        "hidden lg:flex flex-col items-center sticky top-0 h-screen"
      )}
    >
      <div className="my-32">
        <p className="font-semibold text-xl mb-5">Who to follow</p>
        <div className="pr-20 flex flex-col gap-5">
          {users.map((user) => (
            <UserCard
              key={user.username}
              username={user.username}
              displayName={user.displayName}
              userPic={user.profilePic}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
