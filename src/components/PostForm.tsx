"use client";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { handleCreatePost } from "@/actions/post";
import { Button } from "@/components/ui/button";
import {
  Globe2Icon,
  GlobeLockIcon,
  ImageUpIcon,
  Loader2Icon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useForm } from "react-hook-form";
import { useRef, useState, useTransition } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "./SingleImageDropzone";
import { PostFormSchema } from "@/schemas/form-schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type PostFormProps = {
  userImage: string | null | undefined;
  isPrivate: boolean;
};

export default function PostForm({ ...props }: PostFormProps) {
  const { edgestore } = useEdgeStore();
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [postImagePreview, setPostImagePreview] = useState<File>();

  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      postContent: "",
      postImageUrl: undefined,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  const collapsibleTriggerRef = useRef<HTMLButtonElement>(null);
  const onSubmit = (values: z.infer<typeof PostFormSchema>) => {
    startTransition(async () => {
      try {
        let postImageURL = undefined;
        if (postImagePreview) {
          const res = await edgestore.publicImage.upload({
            file: postImagePreview,
            input: {
              category: "postImage",
            },
          });
          postImageURL = res.url;
        }
        const res = await handleCreatePost({
          postContent: values.postContent,
          postImageUrl: postImageURL,
        });
        if (res.error) {
          setError(res.error);
          return;
        }
        formRef.current?.reset();
        collapsibleTriggerRef.current?.click();
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errorMap = error.flatten().fieldErrors;
          setError(errorMap["postContent"]?.[0] ?? "An error occurred");
        } else {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An error occurred");
          }
        }
      }
    });
  };

  return (
    <form
      ref={formRef}
      className="flex gap-2 items-start p-5 border-b"
      onSubmit={form.handleSubmit(onSubmit)}
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
          {...form.register("postContent")}
          name="postContent"
          placeholder="What's happening?"
          className="text-xl border-none shadow-none focus-visible:ring-0"
        />
        {error && <p className="text-red-500 text-sm pl-3 py-1">{error}</p>}
        <div className="flex items-center gap-2 text-gray-500 text-sm pl-3">
          {props.isPrivate ? (
            <>
              <GlobeLockIcon className="h-4 w-4" />
              <span>Only people following you can view</span>
            </>
          ) : (
            <>
              <Globe2Icon className="h-4 w-4" />
              <span>Everyone can view</span>
            </>
          )}
        </div>
        <Separator className="my-2" />
        <Collapsible className="pl-3">
          <div className="flex flex-col items-center justify-center gap-2 mb-5 md:flex-row">
            {/* Don't wrap button inside the trigger or it will create hydration errors */}
            <CollapsibleTrigger
              ref={collapsibleTriggerRef}
              onClick={() => {
                setPostImagePreview(undefined);
                formRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex gap-1 h-full justify-center items-center outline outline-1 text-xs w-full py-2 md:rounded-full bg-accent"
            >
              <ImageUpIcon className="h-3 w-3" />
              Upload Image
            </CollapsibleTrigger>
            <Button
              className="ml-auto w-full md:rounded-full"
              onClick={() => setError(undefined)}
              type="submit"
              disabled={isPending || !form.formState.isValid}
            >
              {isPending ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> Please
                  wait{" "}
                </>
              ) : (
                "Post"
              )}
            </Button>
          </div>
          <CollapsibleContent>
            <AspectRatio
              ratio={16 / 10}
              className="flex items-center justify-center"
            >
              <SingleImageDropzone
                value={postImagePreview}
                onChange={(img) => {
                  setPostImagePreview(img);
                }}
              />
            </AspectRatio>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </form>
  );
}
