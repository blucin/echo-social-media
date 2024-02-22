"use client";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { handleCreatePost } from "@/actions/post";
import SubmitButton from "@/components/SubmitButton";
import { Globe2Icon } from "lucide-react";
import { Separator } from "./ui/separator";
import { useFormState } from "react-dom";
import { useRef, useEffect } from "react";

type PostFormProps = {
  userImage: string | null | undefined;
};

export default function PostForm({ ...props }: PostFormProps) {
  const [formState, formAction] = useFormState(handleCreatePost, {
    message: "idle",
    postContent: "",
  })
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.message === "success") {
      formRef.current?.reset();
    }
  }, [formState]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex gap-3 items-start p-5 border-b"
    >
      <Image
        src={props.userImage || "/default-profile-pic.png"}
        alt="Profile picture"
        width={50}
        height={50}
        className={"rounded-full"}
        priority
      />
      <div className="flex-1 flex flex-col gap-1">
        <Textarea
          name="postContent"
          placeholder="What's happening?"
          className="text-xl border-none focus-visible:ring-0"
        />
        {formState.error && (
          <p className="text-red-500 text-sm pl-3 py-1">{formState.error}</p>
        )}
        <div className="flex items-center gap-2 text-gray-500 text-sm pl-3">
          <Globe2Icon className="h-4 w-4" />
          <span>Everyone can reply</span>
        </div>
        <Separator className="my-2" />
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
