"use client";

import { useSession } from "@/context/sessionContext";
import Link from "next/link";

function Header() {
  const { session } = useSession();

  console.log("IS AUTH IN HEADER: ", session);
  return (
    <div className="flex gap-2 p-4 mt-2 w-full justify-evenly bg-slate-900 border-slate-500 border-1">
      <Link href={"/"}>Home</Link>
      {!session?.createdTime && <Link href={"/login"}>Sign In</Link>}
      {session?.createdTime && (
        <>
          <Link href={"/summarize"}>Summary</Link>
          <Link href={"/bookmarks"}>Bookmarks</Link>
        </>
      )}
    </div>
  );
}

export default Header;
