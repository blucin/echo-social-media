import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { SignInBtn, SignOutBtn } from "@/components/LoginBtns";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen items-center justify-center gap-3 p-24">
      <div className="flex flex-col text-center mr-5">
        <h1>Echo, A Social Media Application</h1>
        <p> ⚠️ Make Login work with vercel, currently works for localhost only. </p>
      </div>
      {session ? (
        <>
          <SignOutBtn />
          <pre>
            <code>{JSON.stringify(session, null, 2)}</code>
          </pre>
        </>
      ) : (
        <SignInBtn />
      )}
    </main>
  );
}
