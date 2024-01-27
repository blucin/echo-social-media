import Image from "next/image";
import { cn } from "@/lib/utils";

// TODO: add right side bar
export default function RightSideBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(className, "hidden lg:flex flex-col items-end sticky top-0 h-screen ml-10")}
    >
      <div className="my-32">
        <p className="font-semibold text-xl mb-5">Who to follow</p>
        <div className="flex flex-col pr-10 xl:grid grid-cols-2 gap-5">
          <div className="flex gap-5 items-center">
            <Image
              src=""
              alt="profile"
              className="rounded-full w-14 h-14 bg-gray-200"
              width={14}
              height={14}
            />
            <div>
              <p className="font-semibold">Kanye West</p>
              <p className="text-gray-500">@kanyewest</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <Image
              src=""
              alt="profile"
              className="rounded-full w-14 h-14 bg-gray-200"
              width={14}
              height={14}
            />
            <div>
              <p className="font-semibold">Kanye West</p>
              <p className="text-gray-500">@kanyewest</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <Image
              src=""
              alt="profile"
              className="rounded-full w-14 h-14 bg-gray-200"
              width={14}
              height={14}
            />
            <div>
              <p className="font-semibold">Kanye West</p>
              <p className="text-gray-500">@kanyewest</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <Image
              src=""
              alt="profile"
              className="rounded-full w-14 h-14 bg-gray-200"
              width={14}
              height={14}
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
