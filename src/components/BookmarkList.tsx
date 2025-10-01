"use client";

import { useSummaries } from "../context/SummarizeContext";
import SummaryCard from "./SummaryCard";

function BookmarkList() {
  const { bookmarks } = useSummaries();

  return (
    <div className="p-8 flex flex-wrap justify-evenly gap-20 max-w-[1650px] mx-auto">
      {bookmarks &&
        bookmarks.map((b) => {
          return (
            <div className="item-wraper" key={b.id}>
              <SummaryCard data={b} />
            </div>
          );
        })}
    </div>
  );
}

export default BookmarkList;
