import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/auth";
import { SignInBtn } from "./LoginBtns";
import { createPost } from "@/db/queries/posts";
import SubmitButton from "./SubmitButton";
import { z } from "zod";
import { Globe2Icon } from "lucide-react";
import { Separator } from "./ui/separator";

const formSchema = z.object({
  postContent: z
    .string()
    .min(1, "Post can't be empty")
    .max(280, "Post can't be longer than 280 characters")
    .refine((content) => !content.startsWith(" "), {
      message: "Post can't start with a space",
    })
    .refine((content) => content.trim().length > 0, {
      message: "Post can't be just spaces",
    }),
});

export default async function PostForm() {
  const session = await auth();

  if (!session) {
    return (
      <div className="xl:hidden flex flex-col gap-3 px-5 py-10 border-b">
        <p className="text-center text-gray-400">Log in to post</p>
        <div className="flex justify-center">
          <SignInBtn />
        </div>
      </div>
    );
  }

  async function handleSubmit(formData: FormData) {
    "use server";
    const validated = formSchema.safeParse({
      postContent: formData.get("postContent"),
    });

    if (!validated.success) {
      return {
        errors: validated.error.flatten(),
      };
    }

    if (!session) {
      return {
        error: "You must be logged in to post",
      };
    }

    const res = await createPost({
      userId: session.user.id,
      content: validated.data.postContent,
    });
  }

  return (
    <form
      action={handleSubmit}
      className="flex gap-3 items-start px-5 py-10 border-b"
    >
      <Image
        src={session?.user?.image || "/default-profile-pic.png"}
        alt="Profile picture"
        width={50}
        height={50}
        className={"rounded-full"}
        priority
      />
      <div className="flex-1 flex flex-col gap-3">
        <Textarea
          name="postContent"
          placeholder="What's happening?"
          className="text-xl border-none focus-visible:ring-0"
        />
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Globe2Icon className="h-4 w-4" />
          <span>Everyone can reply</span>
        </div>
        <Separator className="my-2"/>
        <SubmitButton
          text="Post"
          revalidatequerykey={"posts"}
          className="ml-auto text-base font-bold rounded-full"
          size={"lg"}
        />
      </div>
    </form>
  );
}
