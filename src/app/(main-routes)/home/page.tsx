import Posts from "@/components/Posts";
import PostForm from "@/components/PostForm";
import { auth } from "@/auth";
import { SignInBtn } from "@/components/LoginBtns";

export default async function Home() {
  const session = await auth();
  return (
    <>
      {session ? (<PostForm userImage={session.user.image}/>) : (
        <div className="xl:hidden flex flex-col gap-3 px-5 py-10 border-b">
        <p className="text-center text-gray-400">Log in to post</p>
        <div className="flex justify-center">
          <SignInBtn />
        </div>
      </div>
      )}
      <main className="flex flex-col">
        <Posts postsPerLoad={5} />
      </main>
    </>
  );
}
