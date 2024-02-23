import { getUserByUsername } from "@/db/queries/users";
import { XCircleIcon } from "lucide-react";
import UserPosts from "@/components/UserPosts";
import Image from "next/image";
import { Suspense } from 'react';
import LoadingPosts from "@/components/LoadingPosts";

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

  return (
    <>
      <div className="relative border-b">
        <div className="flex flex-col items-center justify-center h-40 bg-accent">
          {user.bannerImage ? (
            <Image
              src={user.bannerImage}
              alt="banner"
              width={500}
              height={200}
            />
          ) : null}
        </div>
        <div className="flex items-center gap-4 px-5 pt-8 pb-5 absolute top-28 left-0 right-0">
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
        {/* Placeholder div to provide offset */}
        <div className="pt-20 pb-5" />
      </div>
      <Suspense fallback={<LoadingPosts postCnt={7}/>}>
        <UserPosts
          userId={user.id}
          page={page}
          limit={7}
          username={user.username}
        />
      </Suspense>
    </>
  );
}
