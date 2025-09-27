import { getSession } from "@/lib/session";
import LogoutButton from "./LogoutButton";

export default async function SessionInfo() {
  const session = await getSession();
  if (!session) return null;
  // createdTime -> Unix Epoch MS
  const display = new Date(session.createdTime * 1000).toLocaleString();

  return (
    <div>
      Current Session Info:
      <p>
        Session Created:
        <time dateTime={display} suppressHydrationWarning>
          {display}
        </time>
      </p>
      <LogoutButton />
    </div>
  );
}
