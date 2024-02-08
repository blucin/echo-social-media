import { auth } from "@/auth";

import Post from "@/components/Post";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex flex-col">
      {[...Array(10)].map((x,i)=>
        <Post key={i} />
      )}
    </main>
  );
}
