"use client";

import { Summary, useSummaries } from "@/context/SummarizeContext";

export interface SummaryCardProps {
  data: Summary;
}

function SummaryCard({ data }: SummaryCardProps) {
  const { url, summary, bias, id, title } = data;

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
    <div className="flex flex-col gap-2 min-w-[300px] md:min-w-[500px] h-[600px] overflow-hidden justify-between items-center px-2 py-8 border-neutral-700 border-1 bg-neutral-900 rounded-2xl text-center">
      <div className="flex flex-col items-center justify-start gap-1">
        <h1 className="text-xl font-bold w-2/3 mx-auto">{title}</h1>

        <a className="text-blue-400/80" href={url} target="_blank">
          {url}
        </a>
        <p className="text-sm text-neutral-500">id: {id}</p>
      </div>
      <div className="flex overflow-hidden w-full justify-between gap-4">
        <div className="flex flex-2 flex-col p-2 bg-neutral-700/30 rounded-xl overflow-auto">
          <h2 className="text-lg font-semibold">Summary:</h2>
          <p className="font-medium mb-2 text-left px-2">{summary}</p>
        </div>
        <div className="flex flex-1 flex-col p-2 bg-neutral-700/30 rounded-xl overflow-auto">
          <h2 className="text-lg font-semibold">Bias:</h2>
          <p className="font-medium mb-2 text-left px-2">{bias}</p>
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
