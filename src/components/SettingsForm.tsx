"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEdgeStore } from "@/lib/edgestore";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Loader2 } from "lucide-react";
import { ErrorMessage } from "@/components/FormMessage";
import { updateProfile } from "@/actions/profile";
import Image from "next/image";

import { SettingsPageFormSchema as formSchema } from "@/schemas/form-schemas";

type SettingsFormProps = {
  username: string | undefined;
  displayName: string | undefined;
  bio: string | undefined;
  bannerImage: string | undefined | null;
  image: string | undefined | null;
};

// TODO: Add type safety
// Current implementation is not type safe
// user keys should completely match the database schema
export default function SettingsForm({ ...props }: SettingsFormProps) {
  // action sucess/error handling
  const { edgestore } = useEdgeStore();
  const [error, setError] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const [pfp, setPfp] = useState<string | undefined>(
    props.image || "/default-profile.png"
  );
  const [banner, setBanner] = useState<string | undefined>(
    props.bannerImage || ""
  );

  // form state
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: props.username,
      displayName: props.displayName,
      bio: props.bio,
      bannerImage: undefined,
      image: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        let bannerImageURL = undefined;
        let imageURL = undefined;
        // upload images if they are files to edgestore and get their urls
        if (values.bannerImage && values.bannerImage instanceof File) {
          const res = await edgestore.publicImage.upload({
            file: values.bannerImage,
            input: {
              category: "bannerImage",
            },
          });
          bannerImageURL = res.url;
        }
        if (values.image && values.image instanceof File) {
          const res = await edgestore.publicImage.upload({
            file: values.image,
            input: {
              category: "image",
            },
          });
          imageURL = res.url;
        }
        // create a payload with only the fields that have changed
        const temp = {
          username:
            values.username !== props.username ? values.username : undefined,
          bio: values.bio !== props.bio ? values.bio : undefined,
          bannerImage:
            bannerImageURL !== props.bannerImage ? bannerImageURL : undefined,
          image: imageURL !== props.image ? imageURL : undefined,
        };
        const payload = Object.fromEntries(
          Object.entries(temp).filter(([, v]) => v !== undefined)
        );
        const res = await updateProfile(payload);
        if (res?.error) {
          if (res.error === "Username already exists") {
            form.setError("username", {
              message: "Username already exists",
            });
            return;
          }
          setError(
            typeof res.error === "string"
              ? res.error
              : "An unknown error occurred"
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    });
  }

  return (
    <>
      <div className="-mb-6">
        <AspectRatio
          ratio={2.3 / 0.7}
          className="bg-muted border-b z-10 opacity-80"
        >
          {banner ? (
            <Image
              src={banner}
              alt="banner"
              fill
              className="rounded-md object-cover"
            />
          ) : null}
        </AspectRatio>
        <div className="flex items-center justify-center relative top-[-50px] z-20">
          <Image
            src={pfp || "/default-profile.png"}
            alt="profile"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-6 px-7 bg-background"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input id="name" {...field} />
                </FormControl>
                <FormDescription>
                  Your name will be displayed on your profile
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input id="username" {...field} />
                </FormControl>
                <FormDescription>This is your unique username</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input id="bio" {...field} />
                </FormControl>
                <FormDescription>
                  Tell us a little about yourself
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bannerImage"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Banner Image</FormLabel>
                <FormControl>
                  <Input
                    id="bannerImage"
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        form.setValue("bannerImage", e.target.files[0]);
                        setBanner(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This image will be displayed on your profile
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <Input
                    id="image"
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        form.setValue("image", e.target.files[0]);
                        setPfp(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This image will be displayed on your profile
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <ErrorMessage message={error} />}

          <Button onClick={() => setError(undefined)} type="submit">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
              </>
            ) : (
              "Save Profile"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
