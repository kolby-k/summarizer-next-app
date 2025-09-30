"use client";

import { Summary, useSummaries } from "../context/SummarizeContext";

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
    <div className="summary-card">
      <p className="text-3xl font-bold text-center mx-auto">{title}</p>
      <div className="text-container">
        <p className="text-2xl text-center mb-1 text-(--text-secondary)">
          Summary
        </p>
        <p className="mb-2 text-left text-lg">{summary}</p>
      </div>
      <button
        className="px-4 py-2 bg-yellow-400 text-black font-medium m-2 cursor-pointer"
        onClick={toggleBookmark}
      >
        {isBookmarked ? "Remove Bookmark" : "Bookmark"}
      </button>
    </div>
  );
}

export default SummaryCard;
