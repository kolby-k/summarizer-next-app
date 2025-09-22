import { getSession } from "@/lib/auth/getSession";

export default async function SessionInfo() {
  const session = await getSession();
  const iso = session?.createdTime ?? null;
  const display = iso ? new Date(iso).toLocaleString() : "Unknown...";

  return (
    <div>
      Current Session Info:
      <p>Ip Address: {session?.ip ?? "—"}</p>
      <p>
        Session Created:{" "}
        {iso && (
          <time dateTime={display} suppressHydrationWarning>
            {display}
          </time>
        )}
      </p>
    </div>
  );
}
