"use client";
import { handleMarkNotifsAsRead } from "@/actions/notifications";
import { useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AcceptFollowButton({ notifId }: { notifId: string }) {
  const [isLoading, startTransition] = useTransition();
  return (
    <Button
      disabled={isLoading}
      onClick={() => {
        startTransition(async () => {
          await handleMarkNotifsAsRead(notifId);
        });
      }}
    >
      {isLoading ? (
        <>
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> Loading ...
        </>
      ) : (
        "Accept"
      )}
    </Button>
  );
}
