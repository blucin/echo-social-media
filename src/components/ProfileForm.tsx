"use client";

import { useState, useTransition } from "react";
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
import { Loader2 } from "lucide-react";
import { ErrorMessage } from "./FormMessage";

import { ProfileFormSchema as formSchema } from "@/form-schemas";
import { createProfile } from "@/actions/profile";

export default function ProfileForm() {
  // action sucess/error handling
  const [error, setError] = useState<string | undefined>("");

  // transition for actions
  const [isPending, startTransition] = useTransition();

  // form state
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      bio: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const res = await createProfile({
        username: values.username,
        bio: values.bio,
      });

      if (res.error) {
        setError(res.error);
      }
    });
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

        {/* server action errors */}
        {error && <ErrorMessage message={error} />}

        <Button type="submit">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </>
          ) : (
            "Create profile"
          )}
        </Button>
      </form>
    </Form>
  );
}
