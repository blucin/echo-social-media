import { SignInBtn } from "@/components/LoginBtns";

export default function SignIn() {
  return (
    <main className="flex flex-col gap-3 h-full justify-center items-center">
      <SignInBtn />
      <div className="text-center text-muted-foreground px-10">
        By signing in, you agree to share your
        <br />
        email address, name and profile picture with Echo.
      </div>
    </main>
  );
}
