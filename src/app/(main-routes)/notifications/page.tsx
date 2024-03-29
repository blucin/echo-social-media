import { getNotifsByUserId } from "@/db/queries/notifications";
import { auth } from "@/auth";
import AcceptFollowButton from "@/components/AcceptFollowButton";
import NotificationCard from "@/components/Notification";

export default async function NotificationPage() {
  const session = await auth();
  if (!session) {
    // pretty sure that the middleware should handle this
    return null;
  }
  const notifs = await getNotifsByUserId(session.user.id);

  return (
    <main>
      {notifs.length > 0 ? (
        notifs.map((notif) => {
          return (
            <div key={notif.notifId}>
              <NotificationCard
                notifId={notif.notifId}
                notifType={notif.notifType}
                hasRead={notif.hasRead}
                fromUser={{
                  username: notif.fromUser.username
                    ? notif.fromUser.username
                    : "",
                }}
              />
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center h-96">
          <h1 className="text-xl font-semibold">No notifications</h1>
        </div>
      )}
    </main>
  );
}
