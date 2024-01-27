import { auth } from "@/auth";
import { SignInBtn, SignOutBtn } from "@/components/LoginBtns";

// top bar
import { Button } from "@/components/ui/button";
import {
  AudioLinesIcon,
  HomeIcon,
  CompassIcon,
  BellIcon,
  SettingsIcon,
  FeatherIcon,
} from "lucide-react";

import Post from "@/components/Post";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex flex-col">
      {/*
      <div className="flex flex-col text-center mr-5">
        <h1>Echo, A Social Media Application</h1>
        <p>
          {" "}
          ⚠️ Make Login work with vercel, currently works for localhost only.{" "}
        </p>
      </div>
      {session ? (
        <>
          <SignOutBtn />
          <code>{JSON.stringify(session, null, 4)}</code>
        </>
      ) : (
        <SignInBtn />
      )}
      */}
      {[...Array(10)].map((x,i)=>
        <Post key={i} />
      )}
    </main>
  );
}
