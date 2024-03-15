import Posts from "@/components/Posts";
import PostForm from "@/components/PostForm";
import { auth } from "@/auth";
import { SignInBtn } from "@/components/LoginBtns";

export default async function FollowingPage() {
  const session = await auth();
  if (!session) {
    return (
      <main className="xl:hidden flex flex-col gap-3 px-5 py-10 border-b">
        <p className="text-center text-gray-400">Log in to post</p>
        <div className="flex justify-center">
          <SignInBtn />
        </div>
      </main>
    );
  }
  return (
    <main className="flex flex-col">
      <PostForm userImage={session.user.image} isPrivate={session.user.isPrivate} />
      <Posts postsPerLoad={5} followingOnly />
    </main>
  );
}
