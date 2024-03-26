import { Skeleton } from "@/components/ui/skeleton";
import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <>
    <div className="border-b">
      <Skeleton className="w-full h-48" />
    </div>
    <div className="flex items-center justify-center h-full mt-5">
      <div className="text-gray-500 flex flex-col items-center gap-2 h-full">
        <Loader2Icon className="h-12 w-12 animate-spin" />
        <p className="text-pretty">Loading... Please wait</p>
      </div>
    </div>
    </>
  );
}
