import { signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export function SignInBtn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button>Sign In With Google</Button>
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
      <Button>Sign out</Button>
    </form>
  );
}
