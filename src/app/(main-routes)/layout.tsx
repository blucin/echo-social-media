import { auth } from "@/auth";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import TopBar from "@/components/TopBar";

import {
  AudioLinesIcon,
  HomeIcon,
  CircleUserRoundIcon,
  BellIcon,
  SettingsIcon,
} from "lucide-react";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <div className="min-h-screen flex max-w-7xl mx-auto xl:grid xl:grid-cols-10">
        <LeftSideBar
          navItems={[
            {
              name: "",
              SvgIconComponent: AudioLinesIcon,
              path: "/home",
            },
            {
              name: "Home",
              SvgIconComponent: HomeIcon,
              path: "/home",
            },
            {
              name: "Profile",
              SvgIconComponent: CircleUserRoundIcon,
              path: session ? `/user/${session.user.username}` : "/signin",
            },
            {
              name: "Notification",
              SvgIconComponent: BellIcon,
              path: "/notifications",
            },
            {
              name: "Settings",
              SvgIconComponent: SettingsIcon,
              path: "/settings",
            },
          ]}
        />
        <div className="col-span-5 w-full border-x">
          <TopBar />
          <div className="pb-14">
            {children}
          </div>
        </div>
        <RightSideBar
          className="col-span-3 w-full hidden xl:flex flex-col" 
        />
      </div>
    </>
  );
}
