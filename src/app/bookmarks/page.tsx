import BookmarkList from "@/components/BookmarkList";
import { getSession } from "@/lib/session";

export default async function Bookmarks() {
  const session = await getSession();

  return (
    <div className="flex flex-col items-center relative">
      <h1 className="text-4xl font-bold text-red-500">
        Review a list of bookmarks
      </h1>
      <p>{JSON.stringify(session, null, 3)}</p>
      <BookmarkList />
    </div>
  );
}
