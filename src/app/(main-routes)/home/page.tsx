import Posts from "@/components/Posts";
import PostForm from "@/components/PostForm";

export default async function Home() {
  return (
    <>
      <PostForm />
      <main className="flex flex-col">
        <Posts />
      </main>
    </>
  );
}
