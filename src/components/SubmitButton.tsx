"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export interface SubmitButtonProps extends ButtonProps {
  text?: string;
  revalidatequerykey?: string | string[];
}

export default function SubmitButton({ ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const queryClient = useQueryClient();

  if (!pending) {
    queryClient.invalidateQueries({ queryKey: [props.revalidatequerykey]});
  }
  
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending} {...props}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
        </>
      ) : (
        props.text || "Submit"
      )}
    </Button>
  );
}
