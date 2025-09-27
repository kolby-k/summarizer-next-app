"use client";

import { useSummaries } from "@/context/SummarizeContext";
import SummaryCard from "./SummaryCard";

function BookmarkList() {
  const { bookmarks } = useSummaries();

  return (
    <div className="flex flex-1 flex-wrap justify-evenly items-start gap-4 pt-4">
      {bookmarks &&
        bookmarks.map((b) => {
          return <SummaryCard key={b.id} data={b} />;
        })}
    </div>
  );
}

export default BookmarkList;
