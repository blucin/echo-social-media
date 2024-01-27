import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FeatherIcon } from "lucide-react";

type NavItem = {
  name: string;
  path: string;
  SvgIconComponent: LucideIcon;
};

type NavProps = {
  navItems: NavItem[];
  className?: string;
};

export default function LeftSideBar({ navItems, className }: NavProps) {
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
        <Button className="py-7 xl:py-5 rounded-md text-base font-semibold flex items-center xl:mt-5">
          <FeatherIcon className="xl:hidden" />
          <span className="hidden xl:inline-flex flex-none">Tweet</span>
        </Button>
      </div>
    </header>
  );
}
