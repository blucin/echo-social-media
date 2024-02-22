"use client";

import { Textarea } from "@/components/ui/textarea";
import { handleCreateComment } from "@/actions/comments";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { useRef, useEffect } from "react";

export default function CommentForm({ postId }: { postId: string }) {
  const [formState, formAction] = useFormState(handleCreateComment, {
    message: "idle",
    content: "",
    postId,
  });
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
      <Textarea
        name="content"
        placeholder="Write your comment"
        className="text-xl border-none focus-visible:ring-0"
      />
      {formState.error && (
        <p className="text-red-500 text-sm pl-3 py-1">{formState.error}</p>
      )}
      <SubmitButton
        text="Post"
        revalidatequerykey={"comments"}
        className="ml-auto text-base font-bold rounded-full"
      />
    </form>
  );
}