import { getSession } from "@/lib/session/getSession";

export default async function Bookmarks() {
  const session = await getSession();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold text-red-500">
        Review a list of bookmarks
      </h1>
      <p>{JSON.stringify(session, null, 3)}</p>
    </div>
  );
}
