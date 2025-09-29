"use client";

import { useSummaries } from "@/context/SummarizeContext";
import SummaryCard from "./SummaryCard";

function BookmarkList() {
  const { bookmarks } = useSummaries();

  return (
    <div className="pt-4 grid-cols-2 grid gap-4 auto-rows-fr">
      {bookmarks &&
        bookmarks.map((b) => {
          return <SummaryCard key={b.id} data={b} />;
        })}
    </div>
  );
}

export default BookmarkList;
