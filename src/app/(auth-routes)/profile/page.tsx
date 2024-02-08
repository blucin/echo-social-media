import { WavesIcon } from "lucide-react";
import ThemeToggler from "@/components/ThemeToggeler";
import ProfileForm from "@/components/ProfileForm";

export default function Profile() {
  return (
    <>
      <header className="block sticky top-0 border-b-2 h-14 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 xl:hidden">
        <div className="flex items-center justify-between gap-2 h-full p-4">
          <div className="flex items-center gap-2">
            <WavesIcon />
            <h1 className="text-2xl font-bold">Echo</h1>
          </div>
          <ThemeToggler />
        </div>
      </header>
      <main className="xl:grid grid-cols-2 items-center">
        <ProfileForm />
        <div className="hidden xl:flex flex-col p-10 items-end bg-accent h-screen border-l">
          <div className="flex items-center gap-2">
            <WavesIcon />
            <h1 className="text-2xl font-bold">Echo</h1>
          </div>
        </div>
      </main>
    </>
  );
}
