import { getUserByUsername } from "@/db/queries/users";
import { XCircleIcon } from "lucide-react";
import UserPosts from "@/components/UserPosts";
import Image from "next/image";
import { Suspense } from "react";
import LoadingPosts from "@/components/LoadingPosts";
import { auth } from "@/auth";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// TODO: Add followers and following count
export default async function UserPage({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getUserByUsername(params.username);
  const page = searchParams["page"]
    ? parseInt(searchParams["page"] as string)
    : 1;

  if (!user || !user.username) {
    return (
      <main className="flex items-center justify-center h-full">
        <div className=" text-red-500 flex flex-col items-center gap-4">
          <XCircleIcon className="h-12 w-12" />
          <p className="text-pretty">Invalid username or user not found</p>
        </div>
      </main>
    );
  }

  const session = await auth();

  return (
    <>
      <div className="border-b pb-5">
        <AspectRatio
          ratio={2.3 / 0.7}
          className="bg-muted border-b z-10 opacity-80"
        >
          {user.bannerImage ? (
            <Image
              src={user.bannerImage}
              alt="banner"
              fill
              className="rounded-md object-cover"
            />
          ) : null}
        </AspectRatio>
        <div className="flex items-center gap-4 relative top-[-20px] left-5 z-20">
          <Image
            src={user.image || "/default-profile.png"}
            alt="profile"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="flex flex-col pt-3">
            <h1 className="text-pretty text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500">@{user.username}</p>
          </div>
        </div>
        <blockquote className="border-l-4 pl-3 italic text-pretty mx-4">
          {user.bio || "No bio"}
        </blockquote>
      </div>
      <Suspense fallback={<LoadingPosts postCnt={7} />}>
        <UserPosts
          userId={user.id}
          page={page}
          limit={7}
          username={user.username}
          showDeleteBtn={session?.user?.id === user.id}
        />
      </Suspense>
    </>
  );
}
