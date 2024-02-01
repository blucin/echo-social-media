import { WavesIcon } from "lucide-react";
import ThemeToggler from "@/components/ThemeToggeler";
import { SignInBtn } from "@/components/LoginBtns";

export default function SignIn() {
  return (
    <main>
      <div className="block md:grid grid-cols-2 h-screen">
        {/* top right */}
        <div className="absolute top-6 right-8">
          <ThemeToggler />
        </div>

        {/* top left */}
        <div className="absolute flex gap-2 items-center top-8 left-8 pb-10 md:hidden">
          <WavesIcon />
          <h1 className="text-2xl font-bold">Echo</h1>
        </div>

        {/* left */}
        <div className="hidden md:block border-r h-full p-10 bg-accent">
          <div className="flex flex-col justify-between h-full">
            <div className="flex gap-2 items-center">
              <WavesIcon />
              <h1 className="text-2xl font-bold">Echo</h1>
            </div>
            <p className="pb-10 text-muted-foreground">
              Echo, a social media platform for the future.
            </p>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col gap-3 h-full justify-center items-center">
          <SignInBtn />
          <div className="text-center text-muted-foreground px-10">
            By signing in, you agree to share your
            <br />
            email address, name and profile picture with Echo.
          S</div>
        </div>
      </div>
    </main>
  );
}
