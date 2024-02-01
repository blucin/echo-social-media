import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut, auth } from "@/auth";
import { LogInIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";

type NavItem = {
  name: string;
  path: string;
  SvgIconComponent: LucideIcon;
};

type NavProps = {
  navItems: NavItem[];
  className?: string;
};

export default async function LeftSideBar({ navItems, className }: NavProps) {
  const session = await auth();
  return (
    <header className={cn("flex w-auto xl:col-span-2", className)}>
      {/* 
        Replace this if you want a custom nav bar for mobile devices
        <header className={cn("hidden sm:flex w-auto xl:col-span-2", className)}>
    */}
      <div className="flex flex-1 xl:w-60 flex-col sticky top-0 h-screen xl:mr-5">
        <div className="flex flex-col items-start">
          {navItems.map((item, idx) => (
            <Button
              variant="ghost"
              className="flex gap-5 justify-center py-8 text-center text-xl"
              key={idx}
            >
              <item.SvgIconComponent className="w-7 h-7" />
              <div className="hidden xl:inline-flex flex-none text-lg font-medium">
                {item.name}
              </div>
            </Button>
          ))}
        </div>
        {session ? (
          <form
            className="w-full xl:mt-5"
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button className="w-full py-7 xl:py-5">
              <LogOutIcon className="xl:hidden" />
              <span className="hidden xl:block text-base font-semibold">
                Sign Out
              </span>
            </Button>
          </form>
        ) : (
          <Link href="/signin">
            <Button className="w-full py-7 xl:py-5 xl:mt-5">
              <LogInIcon className="xl:hidden" />
              <span className="hidden xl:block text-base font-semibold ">
                Sign In
              </span>
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
