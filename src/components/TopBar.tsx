"use client";
import ThemeToggler from "@/components/ThemeToggeler";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";

export default function TopBar({ ...props }: { disableFollowButton: boolean }) {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex">
        {/* todo: remove redundant css */}
        <div className="flex-1 h-12 grid grid-cols-2 text-center items-center">
          <Link
            href="/home"
            className="font-semibold h-12 flex items-center justify-center"
          >
            <Button
              className={`h-full w-full ${
                pathname === "/home" ? "font-bold" : "text-gray-500"
              }`}
              variant="ghost"
            >
              Public
            </Button>
          </Link>
          <Link
            href={props.disableFollowButton ? "/signin" : "/following"}
            className="border-l h-12 flex items-center justify-center"
          >
            <Button
              className={`h-full w-full border-l ${
                pathname === "/following" ? "font-bold" : "text-gray-500"
              }`}
              variant="ghost"
              disabled={props.disableFollowButton}
            >
              Following
            </Button>
          </Link>
        </div>
        <ThemeToggler className="border-l h-12 w-12 outline-none" />
      </div>
    </nav>
  );
}
