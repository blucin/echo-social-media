"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png"];
const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .refine(
      (username) => {
        if (username.length > 20) {
          return "Username must be at most 20 characters long";
        }
        return /^[a-zA-Z0-9_]+$/.test(username);
      },
      {
        message: "Username can only contain letters, numbers, and underscores",
      }
    ),
  bio: z
    .union([
      z
        .string()
        .length(
          0,
          "Bio needs to contain atleast 4 characters or atmost of 100 characters"
        ),
      z
        .string()
        .min(4)
        .max(
          100,
          "Bio needs to contain atleast 4 characters or atmost of 100 characters"
        ),
    ])
    .optional(),
  thumbnail: z
    .union([
      z.undefined(),
      z
        .any()
        .optional()
        .refine(
          (file) => file instanceof File || file instanceof FileList,
          "Please upload a valid file."
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type.split("/")[1]),
          "File type must be one of .jpeg, .jpg, .png"
        )
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          "File size must not exceed the maximum file size."
        ),
    ])
    .optional(),
});

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      bio: "",
      thumbnail: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-10 xl:justify-self-center space-y-8"
      >
        <h1 className="text-3xl font-bold max-w-72">
          Tell us more about yourself
        </h1>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username*</FormLabel>
              <FormControl>
                <Input
                  className="w-full md:w-96"
                  placeholder="john"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your username. It must be unique. @john is an example.
              </FormDescription>
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
                <Input
                  className="w-full md:w-96"
                  placeholder="I'm a software engineer"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A short description about yourself. This is optional.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Input
                  className="w-full md:w-96"
                  type="file"
                  onChange={(e) => {
                    form.setValue("thumbnail", e.target.files?.[0]);
                  }}
                />
              </FormControl>
              <FormDescription>
                This is your profile thumbnail. This is optional.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
