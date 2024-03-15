import Image from "next/image";
import { cn } from "@/lib/utils";

// TODO: add right side bar
export default function RightSideBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(className, "hidden xl:ml-7 lg:flex flex-col items-center sticky top-0 h-screen")}
    >
      <div className="my-32">
        <p className="font-semibold text-xl mb-5">Who to follow</p>
        <div className="pr-10 grid grid-cols-2 gap-5">
          <div className="flex gap-2 items-center">
            <Image
              src="/default-profile-pic.png"
              alt="profile"
              className="rounded-full w-14 h-14 bg-gray-200"
              width={50}
              height={50}
            />
            <div>
              <p className="font-semibold">Kanye West</p>
              <p className="text-gray-500">@kanyewest</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Image
              src="/default-profile-pic.png"
              alt="profile"
              className="rounded-full w-14 h-14 bg-gray-200"
              width={50}
              height={50}
            />
            <div>
              <p className="font-semibold">Kanye West</p>
              <p className="text-gray-500">@kanyewest</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Image
              src="/default-profile-pic.png"
              alt="profile"
              className="rounded-full w-14 h-14 bg-gray-200"
              width={50}
              height={50}
            />
            <div>
              <p className="font-semibold">Kanye West</p>
              <p className="text-gray-500">@kanyewest</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Image
              src="/default-profile-pic.png"
              alt="profile"
              className="rounded-full w-14 h-14 bg-gray-200"
              width={50}
              height={50}
            />
            <div>
              <p className="font-semibold">Kanye West</p>
              <p className="text-gray-500">@kanyewest</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
