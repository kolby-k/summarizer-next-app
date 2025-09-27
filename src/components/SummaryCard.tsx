"use client";

import { Summary, useSummaries } from "@/context/SummarizeContext";

export interface SummaryCardProps {
  data: Summary;
}

function SummaryCard({ data }: SummaryCardProps) {
  const { url, summary, bias, id } = data;

  const { bookmarks, addBookmark, removeBookmark } = useSummaries();
  const isBookmarked = bookmarks.filter((b) => b.id === id).length === 1;
  console.log(bookmarks);

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(id);
    } else {
      addBookmark(data);
    }
  };

  return (
    <div className="flex flex-col gap-2 min-w-[300px] md:min-w-[500px] justify-center items-center p-2 border-neutral-700 border-1 bg-neutral-900 rounded-2xl text-center">
      <div>
        <h1 className="text-xl font-bold">Summary Title</h1>
        <p className="text-base font-light pb-2">Article: {url}</p>
        <p className="text-sm">{id}</p>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col p-2 bg-neutral-700/30 rounded-xl">
          <h2 className="text-lg font-semibold mb-1">Summary:</h2>
          <p className="font-medium mb-2">{summary}</p>
        </div>
        <div className="flex flex-1 flex-col p-2 bg-neutral-700/30 rounded-xl">
          <h2 className="text-lg font-semibold mb-1">Bias:</h2>
          <p className="font-medium mb-2">{bias}</p>
        </div>
      </div>
      <button
        className="px-4 py-2 bg-yellow-400 text-black font-semibold m-2 cursor-pointer"
        onClick={toggleBookmark}
      >
        {isBookmarked ? "Remove Bookmark" : "Bookmark"}
      </button>
    </div>
  );
}

export default SummaryCard;
