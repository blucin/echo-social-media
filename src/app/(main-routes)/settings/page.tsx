import { auth } from "@/auth";
import { getUserById } from "@/db/queries/users";
import SettingsForm from "@/components/SettingsForm";
import { XCircleIcon } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const user = await getUserById(session.user.id);
  if (!user) {
    return (
      <main className="container mx-auto p-5 space-y-6">
        <div className="flex items-center justify-center space-x-2">
          <XCircleIcon className="w-8 h-8 text-red-500" />
          <p className="text-red-500">User not found</p>
        </div>
      </main>
    );
  }
  return (
    <main>
      <SettingsForm
        username={user.username || ""}
        displayName={user.name || ""}
        bio={user.bio || ""}
        bannerImage={user.bannerImage || undefined}
        image={user.image || undefined}
        isPrivate={user.isPrivate}
      />
    </main>
  );
}
