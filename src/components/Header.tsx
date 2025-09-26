import { getSession } from "@/lib/session/getSession";
import Link from "next/link";

async function Header() {
  const isAuth = await getSession();

  return (
    <div className="flex gap-2 p-4 mt-2 w-full justify-evenly bg-slate-900 border-slate-500 border-1">
      <Link href={"/"}>Home</Link>
      {!isAuth && <Link href={"/sign-in"}>Sign In</Link>}
      {isAuth && (
        <>
          <Link href={"/summarize"}>Summary</Link>
          <Link href={"/bookmarks"}>Bookmarks</Link>
        </>
      )}
    </div>
  );
}

export default Header;
