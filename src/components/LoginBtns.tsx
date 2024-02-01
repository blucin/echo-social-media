import { signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SignInBtn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button className="p-5 flex gap-2 items-center font-medium">
        <Image
          src="/google.svg"
          alt="Google Logo"
          className="dark:invert"
          width={17}
          height={17}
          priority
        />
        Sign In With Google
      </Button>
    </form>
  );
}

export function SignOutBtn() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button>Sign Out</Button>
    </form>
  );
}
